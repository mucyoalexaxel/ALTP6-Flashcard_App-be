import { GraphQLFieldConfig, GraphQLFieldResolver } from "graphql";
import { AuthenticationError } from "apollo-server-core";
import { FlashCard } from "@prisma/client";
import { IApolloServerContext } from "@src/lib/interfaces/IApolloServerContext";
import { createFlashCard } from "@src/services/flashCardService";
import FlashCardType from "@src/graphql/schema/typedefs/FlashCardType";
import { CreateFlashCardInput } from "@src/graphql/schema/typedefs/FlashCardType";

export const createFlashCardMutationResolver: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = async (
  source,
  { input: { question, answer } },
  context
): Promise<FlashCard> => {
  const { userContext } = context;
  if (!userContext) throw new AuthenticationError("User Is Not Authenticated");
  return createFlashCard(question, answer, userContext.userId);
};

const createFlashCardMutation: GraphQLFieldConfig<
  unknown,
  IApolloServerContext
> = {
  description: "Create flashcard",
  type: FlashCardType,
  args: {
    input: {
      type: CreateFlashCardInput,
    },
  },
  resolve: createFlashCardMutationResolver,
};

export default createFlashCardMutation;
