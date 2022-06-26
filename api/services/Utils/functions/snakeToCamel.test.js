import { describe, test, expect } from "vitest";

const snakeToCamel = require("./snakeToCamel");

describe("snakeToCamel function", () => {
  test("Should return the value unchanged if it's either falsy or not a string", () => {
    expect(snakeToCamel(null)).toEqual(null);
    expect(snakeToCamel(undefined)).toEqual(undefined);
    expect(snakeToCamel([])).toEqual([]);
  });

  test("Should transform from snake case to camel case", () => {
    expect(snakeToCamel("snake_to_camel")).toEqual("snakeToCamel");
    expect(snakeToCamel("snake_toCamel")).toEqual("snakeToCamel");
  });
});
