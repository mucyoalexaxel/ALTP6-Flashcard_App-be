import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';

const CreateFlashCardInput: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'CreateFlashCardInput',
  description: 'Create flashcard input',
  fields: {
    question: {
      type: new GraphQLNonNull(GraphQLString),
      description: `The flashcard's question`,
    },
    answer: {
      type: new GraphQLNonNull(GraphQLString),
      description: `The flashcard's answer`,
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID),
      description: `The flashcard's creator user Id`,
    },
  },
});

export default CreateFlashCardInput;
