import { GraphQLObjectType } from "graphql";
import getAllFlashCardsQuery, {
  getFlashCardByIdQuery,
} from "@src/graphql/schema/resolvers/query/FlashCardsQuery";

const queryType: GraphQLObjectType = new GraphQLObjectType({
  name: "Query",
  fields: {
    getAllFlashCards: getAllFlashCardsQuery,
    getFlashCardById: getFlashCardByIdQuery,
  },
});

export default queryType;
