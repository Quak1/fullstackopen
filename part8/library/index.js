const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const express = require("express");
const http = require("http");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { MONGODB_URI, JWT_SECRET } = require("./utils/config");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const User = require("./models/user.js");

console.log("connecting to MongoDB");
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const start = async () => {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });
  // WebSocketServer start listening.
  const serverCleanup = useServer({ schema }, wsServer);

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith("bearer ")) {
        const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
        const currentUser = await User.findById(decodedToken.id);
        return { currentUser };
      }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({
    app,
    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: "/",
  });

  // Modified server startup
  httpServer.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000`)
  );
};

start();
