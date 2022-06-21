import jwt from "jsonwebtoken";
import dotenv from "dotenv-safe";
import { decode } from "punycode";

dotenv.config();
const secretKey = process.env.JWT_SECRET;
export type jwtUserPayload = {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
};

export const signUserToken = (payload: jwtUserPayload, duration: string) =>
  jwt.sign(
    {
      userId: payload.userId,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
    },
    `${secretKey}`,
    {
      expiresIn: duration,
    }
  );

export const verifyUserToken: any = (accessToken: string) => {
  try {
    const decoded: any = jwt.verify(accessToken, `${secretKey}`);
    const { userId, firstName, lastName, email } = decoded;
    const userData = { userId, firstName, lastName, email };
    return { userData };
  } catch (error) {
    return { error };
  }
};
