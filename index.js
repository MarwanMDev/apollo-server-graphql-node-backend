const { ApolloServer } = require('@apollo/server');
const {
  startStandaloneServer,
} = require('@apollo/server/standalone');
const dbConnect = require('./db/dbConnect');

// const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

dbConnect()
  .then(async () => {
    return await startStandaloneServer(server, {
      listen: { port: 5000 },
    });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
