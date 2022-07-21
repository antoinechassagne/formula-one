import { snakeToCamel, camelToSnake } from "../Utils";
import { GenericObject } from "../../types";

export function serialize<T>(obj: GenericObject) {
  return Object.keys(obj).reduce((mappedData, key) => {
    mappedData[camelToSnake(key) as keyof T] = obj[key];
    return mappedData;
  }, {} as T);
}

export function deserialize<T>(obj: GenericObject) {
  return Object.keys(obj).reduce((mappedData, key) => {
    mappedData[snakeToCamel(key) as keyof T] = obj[key];
    return mappedData;
  }, {} as T);
}

export function deserializeMany<T>(items: GenericObject[]) {
  return items.map(item => deserialize<T>(item));
}
