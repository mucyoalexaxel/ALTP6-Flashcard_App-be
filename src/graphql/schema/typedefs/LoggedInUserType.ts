import {
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

const LoggedInUserType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'LoggedInUser',
  description: 'Stores Logged In User',
  fields: {
    userId: {
      type: new GraphQLNonNull(GraphQLID),
      description: `The User's Id.`,
    },
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
      description: `The User's First Name.`,
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
      description: `The User's Last Name.`,
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: `The User's email address.`,
    }, 
    accessToken: {
      type: new GraphQLNonNull(GraphQLString),
      description: `The User's email address.`,
    },
    refreshToken: {
      type: new GraphQLNonNull(GraphQLString),
      description: `The User's email address.`,
    },
  },
});

export default LoggedInUserType;
