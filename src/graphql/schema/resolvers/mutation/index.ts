import { RegisterUserMutationResolver, UserLoginMutationResolver, UserLogoutMutationResolver } from '../../../../graphql/schema/resolvers/mutation/UserMutation';
import { createFlashCardMutationResolver } from '../../../../graphql/schema/resolvers/mutation/FlashCardMutation';

const mutation = {
  registerUser: {
    resolve: RegisterUserMutationResolver,
  },
  loginUser: {
    resolve: UserLoginMutationResolver,
  },
  logoutUser: {
    resolve: UserLogoutMutationResolver,
  },
  createFlashCard: {
    resolve: createFlashCardMutationResolver,
  },
};

export default mutation;
