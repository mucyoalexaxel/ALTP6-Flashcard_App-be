import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
} from "graphql";
import UserType from "@src/graphql/schema/typedefs/UserType";

const FlashCardType: GraphQLObjectType = new GraphQLObjectType({
  name: "FlashCard",
  description: "outputs a flashcard",
  fields: {
    flashCardId: {
      type: new GraphQLNonNull(GraphQLID),
      description: `The flashcard's Id.`,
    },
    question: {
      type: new GraphQLNonNull(GraphQLString),
      description: `The flashcard's Question.`,
    },
    answer: {
      type: new GraphQLNonNull(GraphQLString),
      description: `The flashcard's Answer.`,
    },
    user: {
      type: UserType,
      description: "author of the flashcard",
    },
    userId: {
      type: GraphQLInt,
      description: "userID of the author",
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      description: `The flashcard's creation date.`,
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
      description: `The flashcard's update date.`,
    },
  },
});

export const CreateFlashCardInput: GraphQLInputObjectType =
  new GraphQLInputObjectType({
    name: "CreateFlashCardInput",
    description: "Create flashcard input",
    fields: {
      question: {
        type: new GraphQLNonNull(GraphQLString),
        description: `The flashcard's question`,
      },
      answer: {
        type: new GraphQLNonNull(GraphQLString),
        description: `The flashcard's answer`,
      },
    },
  });

export const flashCardByIdInput: GraphQLInputObjectType =
  new GraphQLInputObjectType({
    name: "flashCardByIdInput",
    description: "Flashcard By Id Input",
    fields: {
      flashCardId: {
        type: new GraphQLNonNull(GraphQLInt),
        description: `The flashcard's Id`,
      },
    },
  });

export default FlashCardType;
