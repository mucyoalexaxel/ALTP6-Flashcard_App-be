import { gql } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLSchema, printSchema } from 'graphql';
import mutationType from '../../graphql/schema/typedefs/MutationType';
import queryType from '../../graphql/schema/typedefs/QueryType';
import resolvers from '../../graphql/schema/resolvers';

const schema = makeExecutableSchema({
  typeDefs: gql(
    printSchema(
      new GraphQLSchema({
        query: queryType,
        mutation: mutationType,
      })
    )
  ),
  resolvers,
});

export default schema;
