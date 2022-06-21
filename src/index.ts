import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import dotenv from "dotenv-safe";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import schema from "./graphql/schema/schema";
import { IApolloServerContext } from "./lib/interfaces/IApolloServerContext";
import prisma from "./lib/prisma/prismaClient";
import { jwtUserPayload, verifyUserToken } from "./helpers/jwtHelper";
dotenv.config();

const startServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
    context: async ({ req }): Promise<IApolloServerContext> => {
      const accessToken = req.headers.authorization || undefined;
      const { userData, error } = verifyUserToken(accessToken);
      const userContext: jwtUserPayload | undefined = !error
        ? userData
        : undefined;
      return {
        prisma,
        userContext,
      };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  const corsOptions = {
    origin: "*",
    credentials: true,
  };
  await server.start();
  server.applyMiddleware({
    app,
    cors: corsOptions,
  });
  await new Promise<void>((resolve) => httpServer.listen(process.env.PORT, resolve))
    .then(() =>
      console.log(
        `🚀 Server ready at http://${process.env.DOMAIN_NAME}:${process.env.PORT}${server.graphqlPath}`
      )
    )
    .catch((err) => console.log("Error launching server", err));
};

startServer();
