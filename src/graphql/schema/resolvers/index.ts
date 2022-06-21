import { GraphQLResolverMap } from 'apollo-graphql';
import { IApolloServerContext } from '../../../lib/interfaces/IApolloServerContext';
import mutation from '../../../graphql/schema/resolvers/mutation';
import query from '../../../graphql/schema/resolvers/query';

const resolvers: GraphQLResolverMap<IApolloServerContext> = {
  Query: query,
  Mutation: mutation,
};

export default resolvers;
