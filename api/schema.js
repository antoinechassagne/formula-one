const path = require("path");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { makeExecutableSchema } = require("@graphql-tools/schema");

function loadTypeDefs() {
  return loadFilesSync(path.join(__dirname, "modules/**/*.graphql"));
}

function loadResolvers() {
  return loadFilesSync(path.join(__dirname, "modules/**/resolvers.js"));
}

function buildTypeDefs() {
  const typeDefs = loadTypeDefs();
  return mergeTypeDefs(typeDefs);
}

function buildResolvers() {
  const resolvers = loadResolvers();
  return mergeResolvers(resolvers);
}

function buildSchema() {
  const typeDefs = buildTypeDefs();
  const resolvers = buildResolvers();
  return makeExecutableSchema({ typeDefs, resolvers });
}

module.exports = buildSchema();
