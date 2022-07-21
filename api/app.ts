import fastify from "fastify";
import mercurius from "mercurius";
import schema from "./schema";

const app = fastify({
  logger: {
    transport:
      process.env.NODE_ENV === "development"
        ? {
            target: "pino-pretty",
            options: {
              translateTime: "HH:MM:ss Z",
              ignore: "pid,hostname"
            }
          }
        : undefined
  }
});

app.register(mercurius, {
  schema,
  graphiql: true
});

app.get("/", (request, reply) => {
  reply.send("Welcome on Formula One API. Let's hit /graphql endpoint to start or /graphiql to explore. Enjoy 🏎");
});

export default app;
