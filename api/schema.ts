import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

function loadTypeDefs() {
  return loadFilesSync(path.join(__dirname, "modules/**/typeDefs.js"));
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

export default buildSchema();
