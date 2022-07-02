import { GraphQLFieldConfig, GraphQLFieldResolver } from "graphql";
import { AuthenticationError } from "apollo-server-core";
import { FlashCard } from "@prisma/client";
import { IApolloServerContext } from "../../../../lib/interfaces/IApolloServerContext";
import {
  createFlashCard,
  updateFlashCard,
} from "../../../../services/flashCardService";
import FlashCardType from "../../../../graphql/schema/typedefs/FlashCardType";
import {
  CreateFlashCardInput,
  UpdateFlashCardInput,
} from "../../../../graphql/schema/typedefs/FlashCardType";

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

export const updateFlashCardMutationResolver: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = async (
  source,
  { input: { flashCardId, question, answer } },
  context
): Promise<FlashCard | null> => {
  const { userContext } = context;
  if (!userContext) throw new AuthenticationError("User Is Not Authenticated");
  const isUpdated = await updateFlashCard(
    flashCardId,
    question,
    answer,
    userContext.userId
  );
  if (!isUpdated) throw new AuthenticationError("Not Allowed To Modify This FlashCard");
  return isUpdated;
};

export const updateFlashCardMutation: GraphQLFieldConfig<
  unknown,
  IApolloServerContext
> = {
  description: "Update flashcard",
  type: FlashCardType,
  args: {
    input: {
      type: UpdateFlashCardInput,
    },
  },
  resolve: updateFlashCardMutationResolver,
};

export default createFlashCardMutation;
