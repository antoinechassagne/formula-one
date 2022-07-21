import { getCircuit, getCircuits } from "./repository";
import { SingleResolverQuery, ListResolverQuery } from "../../types";

async function circuit(_: any, { id }: SingleResolverQuery) {
  const { data } = await getCircuit(id);
  return data || null;
}

async function circuits(_: any, { query, skip, limit }: ListResolverQuery) {
  const { data } = await getCircuits(query, skip, limit);
  return data || [];
}

export default {
  Query: { circuit, circuits }
};
