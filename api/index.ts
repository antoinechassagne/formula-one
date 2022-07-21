import app from "./app";

(async () => {
  try {
    await app.listen({
      port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
      host: "0.0.0.0"
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
})();
