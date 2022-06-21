import {
  getAllFlashCardsResolver,
  getFlashCardByIdResolver,
} from "../../../../graphql/schema/resolvers/query/FlashCardsQuery";

const query = {
  getAllFlashCards: {
    resolve: getAllFlashCardsResolver,
  },
  getFlashCardById: {
    resolve: getFlashCardByIdResolver,
  },
};

export default query;
