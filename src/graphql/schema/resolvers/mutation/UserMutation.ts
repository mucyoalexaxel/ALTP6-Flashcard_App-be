import { GraphQLFieldConfig, GraphQLFieldResolver } from "graphql";
import { PrismaClient, User } from "@prisma/client";
import { ValidationError, ApolloError } from "apollo-server-core";
import bcrypt from "bcryptjs";
import { IApolloServerContext } from "../../../../lib/interfaces/IApolloServerContext";
import {
  registerUser,
  loginUser,
  getUserByEmailId,
  isLoggedIn,
  logoutUser
} from "../../../../services/userService";
import UserType, {
  LoggedInUserType,
} from "../../../../graphql/schema/typedefs/UserType";
import {
  RegisterUserInput,
  LoginUserInput,
} from "../../../../graphql/schema/typedefs/UserType";
import { signUserToken } from "../../../../helpers/jwtHelper";
import { jwtUserPayload } from "../../../../helpers/jwtHelper";

type registerDataType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const RegisterUserMutationResolver: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = async (
  source,
  { input: { firstName, lastName, email, password } },
  context: { prisma: PrismaClient }
): Promise<any> => {
  const { prisma } = context;
  const isExistingUser: User | null = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  const handleRegistration = async (userData: registerDataType) => {
    const { firstName, lastName, email, password } = userData;
    const salt = bcrypt.genSaltSync(10);
    const userPassword = bcrypt.hashSync(password, salt);
    return await registerUser(firstName, lastName, email, userPassword)
      .then(async (savedUser) => savedUser)
      .catch(
        (err) =>
          new ApolloError(`Unable To Create User\nDetails Below:\n${err}`)
      );
  };
  if (isExistingUser)
    throw new ValidationError(
      `User with email ${isExistingUser.email} arleady exists`
    );
  return handleRegistration({ firstName, lastName, email, password });
};

const RegisterUserMutation: GraphQLFieldConfig<unknown, IApolloServerContext> =
  {
    description: "Register User",
    type: UserType,
    args: {
      input: {
        type: RegisterUserInput,
      },
    },
    resolve: RegisterUserMutationResolver,
  };

export const UserLoginMutationResolver: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = async (
  source,
  { input: { email, password } },
  context: { userContext: jwtUserPayload }
): Promise<any> => {
  const isExistingUser: User | null = await getUserByEmailId(email);
  if (isExistingUser) {
    const isValidPassword = bcrypt.compareSync(
      password,
      isExistingUser.password
    );
    if (!isValidPassword) throw new ApolloError("Incorrect Password");
    const { userId, firstName, lastName, email } = isExistingUser;
    const isUserLoggedIn = await isLoggedIn(userId);
    if (isUserLoggedIn) throw new ApolloError(`User Is Logged In Already`);
    const userPayload: jwtUserPayload = {
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
    };
    const accessToken = signUserToken(userPayload, "4h");
    return await loginUser(userId, firstName, lastName, email, accessToken)
      .then(async (loggedInUser) => loggedInUser)
      .catch(
        (err) => new ApolloError(`Unable To Login User\nDetails Below:\n${err}`)
      );
  } else throw new ValidationError("User Not Registered");
};

export const UserLoginMutation: GraphQLFieldConfig<
  unknown,
  IApolloServerContext
> = {
  description: "Register User",
  type: LoggedInUserType,
  args: {
    input: {
      type: LoginUserInput,
    },
  },
  resolve: RegisterUserMutationResolver,
};

export const UserLogoutMutationResolver: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = async (
  source,
  args,
  context: { userContext: jwtUserPayload }
): Promise<any> => {
  if (!context.userContext) throw new ApolloError(`User Is Not Logged In`);
  const isUserLoggedIn = await isLoggedIn(context.userContext.userId);
  if (!isUserLoggedIn) throw new ApolloError(`User Is Not Logged In`);
  return await logoutUser(context.userContext.userId);
};

export const UserLogoutMutation: GraphQLFieldConfig<
  unknown,
  IApolloServerContext
> = {
  description: "Logout User",
  type: LoggedInUserType,
  resolve: UserLogoutMutationResolver,
};

export default RegisterUserMutation;
