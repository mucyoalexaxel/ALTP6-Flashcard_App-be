import { ApolloServer } from "apollo-server";
import dotenv from "dotenv-safe";
import schema from "@src/graphql/schema/schema";
import { IApolloServerContext } from "./lib/interfaces/IApolloServerContext";
import prisma from "@src/lib/prisma/prismaClient";
import { jwtUserPayload, verifyUserToken } from "./helpers/jwtHelper";
dotenv.config();

const startServer = () => {
  const server = new ApolloServer({
    schema,
    context: async ({ req }): Promise<IApolloServerContext> => {
      const accessToken = req.headers.authorization || undefined;
      const { userData, error } = verifyUserToken(accessToken);
      const userContext:jwtUserPayload | undefined = !error ? userData : undefined
      return {
        prisma,
        userContext,
      };
    },
  });

  server
    .listen()
    .then(({ url }) => {
      console.log(`🚀  Server ready at ${url}graphql`);
    })
    .catch((err) => console.log("Error launching server", err));
};

startServer();
