import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  description: 'Retrieves Users',
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
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: `The User's email address.`,
    },
  },
});

export const RegisterUserInput: GraphQLInputObjectType = new GraphQLInputObjectType({
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
      description: `User's password.`,
    },
  },
});

export const LoginUserInput: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'LoginUserInput',
  description: `User Login Input`,
  fields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: `User's email address.`,
    }, 
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: `User's password.`,
    },
  },
});

export const LoggedInUserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'LoggedInUser',
  description: 'Stores Logged In User',
  fields: {
    userId: {
      type: new GraphQLNonNull(GraphQLInt),
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
      description: `Access Token`,
    },
  },
});

export default UserType;
