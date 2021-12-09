const app = require("./app");

(async () => {
  try {
    await app.listen(3000);
    console.info("Server is running on port http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
})();
