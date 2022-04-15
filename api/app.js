const fastify = require("fastify");
const mercurius = require("mercurius");
const schema = require("./schema");

const app = fastify({ logger: true });

app.register(mercurius, {
  schema,
  graphiql: true
});

app.get("/", (request, reply) => {
  reply.send(
    "Welcome on Formula One API. Let's hit /graphql endpoint to start. Enjoy 🏎"
  );
});

module.exports = app;
