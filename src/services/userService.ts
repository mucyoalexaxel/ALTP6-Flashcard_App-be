import { User, LoggedInUser } from "@prisma/client";
import prismaContext from "../lib/prisma/prismaContext";

export const getAllUsers = async (): Promise<User[]> => {
  const users = await prismaContext.prisma.user.findMany();
  return users;
};

export const getUserById = async (userId: number): Promise<User | null> => {
  return await prismaContext.prisma.user.findUnique({
    where: {
      userId,
    },
  });
};

export const getUserByEmailId = async (email: string): Promise<User | null> => {
  return await prismaContext.prisma.user
    .findUnique({
      where: {
        email,
      },
    })
    .then((user) => user)
    .catch((err) => err);
};

export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<User> => {
  return await prismaContext.prisma.user
    .create({
      data: { firstName, lastName, email, password },
    })
    .then((newUser) => {
      let { userId, firstName, lastName, email, password } = newUser;
      password = "null";
      return { userId, firstName, lastName, email, password };
    })
    .catch((err) => err);
};

export const loginUser = async (
  userId: number,
  firstName: string,
  lastName: string,
  email: string,
  accessToken: string
): Promise<LoggedInUser> => {
  return await prismaContext.prisma.loggedInUser
    .create({
      data: { userId, firstName, lastName, email, accessToken },
    })
    .then((loggedInUser) => loggedInUser)
    .catch((err) => err);
};

export const logoutUser = async (userId: number): Promise<void> => {
  await prismaContext.prisma.loggedInUser.deleteMany({
    where: {
      userId,
    },
  });
};

export const isLoggedIn = async (
  userId: number
): Promise<boolean | undefined> => {
  const user: any = await prismaContext.prisma.loggedInUser.findFirst({
    where: {
      userId,
    },
  });
  return !user ? false : true;
};
