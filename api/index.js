const app = require("./app");

(async () => {
  try {
    await app.listen(process.env.PORT);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
})();
