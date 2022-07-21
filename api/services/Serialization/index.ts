import { snakeToCamel, camelToSnake } from "../Utils";
import { GenericObject } from "../../types";

export function serialize(obj: GenericObject) {
  return Object.keys(obj).reduce((mappedData, key) => {
    mappedData[camelToSnake(key)] = obj[key];
    return mappedData;
  }, {} as GenericObject);
}

export function deserialize(obj: GenericObject) {
  return Object.keys(obj).reduce((mappedData, key) => {
    mappedData[snakeToCamel(key)] = obj[key];
    return mappedData;
  }, {} as GenericObject);
}

export function deserializeMany<T>(items: T[]) {
  return items.map(item => deserialize(item));
}
