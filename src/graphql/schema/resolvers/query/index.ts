import {
  getAllFlashCardsResolver,
  getFlashCardByIdResolver,
} from "@src/graphql/schema/resolvers/query/FlashCardsQuery";

const query = {
  getAllFlashCards: {
    resolve: getAllFlashCardsResolver,
  },
  getFlashCardById: {
    resolve: getFlashCardByIdResolver,
  },
};

export default query;
