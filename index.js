const { ApolloServer } = require('@apollo/server');
const { GraphQLError } = require('graphql');
const {
  startStandaloneServer,
} = require('@apollo/server/standalone');
const dbConnect = require('./db/dbConnect');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

dbConnect()
  .then(async () => {
    // return await startStandaloneServer(server, {
    //   listen: { port: 5000 },
    // });
    return await startStandaloneServer(server, {
      context: async ({ req }) => {
        // get the user token from the headers
        const token = req.headers.authorization || '';

        // try to retrieve a user with the token
        // const user = await getUser(token);
        const user = {};

        // optionally block the user
        // we could also check user roles/permissions here
        if (!user)
          // throwing a `GraphQLError` here allows us to specify an HTTP status code,
          // standard `Error`s will have a 500 status code by default
          throw new GraphQLError('User is not authenticated', {
            extensions: {
              code: 'UNAUTHENTICATED',
              http: { status: 401 },
            },
          });

        // add the user to the context
        return { user };
      },
      listen: { port: 5000 },
    });
  })
  .then((res) => {
    console.log(`🚀  Server ready at ${res.url}`);
    console.log(res);
  });
