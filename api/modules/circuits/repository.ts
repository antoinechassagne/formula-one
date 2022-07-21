import database from "../../database";
import { RepositoryResult, Circuit } from "../../types";

const { serialize, deserialize, deserializeMany } = require("../../services/Serialization");

export async function getCircuit(id: string): Promise<RepositoryResult<Circuit>> {
  try {
    const where = serialize({ id });
    const rawCircuit = await database("circuits").where(where).first();
    const circuit = deserialize(rawCircuit);
    return { data: circuit };
  } catch (error) {
    return { error };
  }
}

export async function getCircuits(query = {}, skip = 0, limit = 100): Promise<RepositoryResult<Circuit[]>> {
  try {
    const where = serialize(query);
    const rawCircuits = await database("circuits")
      .where(where)
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const circuits = deserializeMany(rawCircuits);
    return { data: circuits };
  } catch (error) {
    return { error };
  }
}
