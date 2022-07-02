import { GraphQLFieldConfig, GraphQLFieldResolver } from "graphql";
import {
  AuthenticationError,
  ApolloError,
  UserInputError,
} from "apollo-server-core";
import { FlashCard } from "@prisma/client";
import { IApolloServerContext } from "../../../../lib/interfaces/IApolloServerContext";
import {
  createFlashCard,
  updateFlashCard,
  deleteFlashCard,
  isValidCard,
  isFlashCardAuthor,
} from "../../../../services/flashCardService";
import FlashCardType from "../../../../graphql/schema/typedefs/FlashCardType";
import {
  CreateFlashCardInput,
  UpdateFlashCardInput,
  DeleteFlashCardInput,
  DeletedFlashCardType,
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
  const checkCard = await isValidCard(flashCardId);
  if (!checkCard) throw new ApolloError("Flash Card Not Found");
  const isAuthor = await isFlashCardAuthor(userContext.userId);
  if (!isAuthor)
    throw new AuthenticationError("Not Allowed To Modify This FlashCard");
  else return await updateFlashCard(flashCardId, question, answer);
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

export const deleteFlashCardMutationResolver: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = async (source, { input: { flashCardId } }, context): Promise<any> => {
  const { userContext } = context;
  if (!userContext) throw new AuthenticationError("User Is Not Authenticated");
  const checkCard = await isValidCard(flashCardId);
  if (!checkCard) throw new ApolloError("Flash Card Not Found");
  const isAuthor = await isFlashCardAuthor(userContext.userId);
  if (!isAuthor)
    throw new AuthenticationError("Not Allowed To Delete This FlashCard");
  return await deleteFlashCard(flashCardId, userContext.userId);
};

export const deleteFlashCardMutation: GraphQLFieldConfig<
  unknown,
  IApolloServerContext
> = {
  description: "Delete flashcard",
  type: DeletedFlashCardType,
  args: {
    input: {
      type: DeleteFlashCardInput,
    },
  },
  resolve: deleteFlashCardMutationResolver,
};

export default createFlashCardMutation;
