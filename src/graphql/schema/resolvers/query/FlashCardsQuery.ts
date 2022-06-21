import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLList } from "graphql";
import { AuthenticationError, ApolloError } from "apollo-server-core";
import { FlashCard } from "@prisma/client";
import { IApolloServerContext } from "../../../../lib/interfaces/IApolloServerContext";
import {
  getAllFlashCards,
  getFlashCardById,
} from "../../../../services/flashCardService";
import FlashCardType, {
  flashCardByIdInput,
} from "../../../../graphql/schema/typedefs/FlashCardType";

export const getAllFlashCardsResolver: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = async (source, args, context): Promise<FlashCard[]> => {
  const { userContext } = context;
  if (!userContext) throw new AuthenticationError("User Is Not Authenticated");
  return getAllFlashCards();
};

const getAllFlashCardsQuery: GraphQLFieldConfig<unknown, IApolloServerContext> =
  {
    description: "Get all flashcards query",
    type: GraphQLList(FlashCardType),
    resolve: getAllFlashCardsResolver,
  };

export const getFlashCardByIdResolver: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = async (source, { input: { flashCardId } }, context): Promise<FlashCard> => {
  const { userContext } = context;
  if (!userContext) throw new AuthenticationError("User Is Not Authenticated");
  const flashCard = await getFlashCardById(flashCardId);
  if (!flashCard) throw new ApolloError("FlashCard Not Found");
  return flashCard;
};

export const getFlashCardByIdQuery: GraphQLFieldConfig<
  unknown,
  IApolloServerContext
> = {
  description: "Get Flashcards By Id Query",
  type: FlashCardType,
  args: {
    input: {
      type: flashCardByIdInput,
    },
  },
  resolve: getFlashCardByIdResolver,
};

export default getAllFlashCardsQuery;
