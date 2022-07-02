import { GraphQLObjectType } from "graphql";
import createFlashCardMutation, {
  updateFlashCardMutation,
  deleteFlashCardMutation,
} from "../../../graphql/schema/resolvers/mutation/FlashCardMutation";
import RegisterUserMutation, {
  UserLoginMutation,
  UserLogoutMutation,
} from "../../../graphql/schema/resolvers/mutation/UserMutation";

const mutationType: GraphQLObjectType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    registerUser: RegisterUserMutation,
    loginUser: UserLoginMutation,
    logoutUser: UserLogoutMutation,
    createFlashCard: createFlashCardMutation,
    updateFlashCard: updateFlashCardMutation,
    deleteFlashCard: deleteFlashCardMutation,
  },
});

export default mutationType;
