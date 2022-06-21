import { GraphQLResolverMap } from 'apollo-graphql';
import { IApolloServerContext } from '@src/lib/interfaces/IApolloServerContext';
import mutation from '@src/graphql/schema/resolvers/mutation';
import query from '@src/graphql/schema/resolvers/query';

const resolvers: GraphQLResolverMap<IApolloServerContext> = {
  Query: query,
  Mutation: mutation,
};

export default resolvers;
