import { GraphQLObjectType } from "graphql";
import createFlashCardMutation from "@src/graphql/schema/resolvers/mutation/FlashCardMutation";
import RegisterUserMutation, { UserLoginMutation, UserLogoutMutation } from "@src/graphql/schema/resolvers/mutation/UserMutation";

const mutationType: GraphQLObjectType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    registerUser: RegisterUserMutation,
    loginUser: UserLoginMutation,
    logoutUser: UserLogoutMutation,
    createFlashCard: createFlashCardMutation,
  },
});

export default mutationType;
