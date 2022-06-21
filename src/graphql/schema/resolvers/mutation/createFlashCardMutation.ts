import { GraphQLFieldConfig, GraphQLFieldResolver } from "graphql";
import { FlashCard } from "@prisma/client";
import { IApolloServerContext } from "@src/lib/interfaces/IApolloServerContext";
import { createFlashCard } from "@src/services/flashCardService";
import FlashCardType from "@src/graphql/schema/typedefs/FlashCardType";
import CreateFlashCardInput from "@src/graphql/schema/typedefs/CreateFlashCardInput";

export const createFlashCardMutationResolver: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = async (
  _source,
  { input: { question, answer, userId } },
  _context,
  _info
): Promise<FlashCard> => {
  return createFlashCard(question, answer, userId);
};

const createFlashCardMutation: GraphQLFieldConfig<unknown, IApolloServerContext> =
  {
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
