const nextJest = require("next/jest");

const createConfig = nextJest({
  dir: "./"
});

const config = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  collectCoverage: true,
  collectCoverageFrom: ["./components/**", "./pages/**"]
};

module.exports = createConfig(config);
