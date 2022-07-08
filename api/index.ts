// @ts-nocheck
const app = require("./app");

(async () => {
  try {
    await app.listen({ port: process.env.PORT, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
})();
