import { GraphQLFieldConfig, GraphQLFieldResolver } from "graphql";
import { User } from "@prisma/client";
import { IApolloServerContext } from "@src/lib/interfaces/IApolloServerContext";
import { registerUser } from "@src/services/userService";
import UserType from "@src/graphql/schema/typedefs/UserType";
import RegisterUserInput from "@src/graphql/schema/typedefs/RegisterUserInput";

export const RegisterUserMutationResolver: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = async (
  _source,
  { input: { firstName, lastName, email, password } },
  _context,
  _info
): Promise<User> => {
  return registerUser(firstName, lastName, email, password);
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

export default RegisterUserMutation;
