import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';

const RegisterUserInput: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'RegisterUserInput',
  description: `Register's New User Input`,
  fields: {
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
      description: `User's First Name.`,
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
      description: `User's Last Name.`,
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: `User's email address.`,
    }, 
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: `User's email address.`,
    },
  },
});

export default RegisterUserInput;
