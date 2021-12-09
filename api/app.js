const fastify = require("fastify");
const mercurius = require("mercurius");
const schema = require("./schema");

const app = fastify({ logger: true });

app.register(mercurius, {
  schema,
  graphiql: true
});

module.exports = app;
