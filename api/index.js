const app = require("./app");

(async () => {
  try {
    await app.listen(process.env.PORT, '0.0.0.0');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
})();
