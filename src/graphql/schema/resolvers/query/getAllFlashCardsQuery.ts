import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLList } from 'graphql';
import { FlashCard } from '@prisma/client';
import { IApolloServerContext } from '@src/lib/interfaces/IApolloServerContext';
import { getAllFlashCards } from '@src/services/flashCardService';
import FlashCardType from '@src/graphql/schema/typedefs/FlashCardType';

export const getAllFlashCardsResolver: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = async (_source, _args, _context, _info): Promise<FlashCard[]> => {
  const flashCards = await getAllFlashCards();
  return flashCards;
};

const getAllFlashCardsQuery: GraphQLFieldConfig<unknown, IApolloServerContext> = {
  description: 'Get all flashcards query',
  type: GraphQLList(FlashCardType),
  resolve: getAllFlashCardsResolver,
};

export default getAllFlashCardsQuery;