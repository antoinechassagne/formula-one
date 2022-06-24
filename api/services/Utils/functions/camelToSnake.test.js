import { test, expect } from "vitest";

const camelToSnake = require("./camelToSnake");

test("Should return the value unchanged if it's either falsy or not a string", () => {
  expect(camelToSnake(null)).toEqual(null);
  expect(camelToSnake(undefined)).toEqual(undefined);
  expect(camelToSnake([])).toEqual([]);
});

test("Should transform from camel case to snake case", () => {
  expect(camelToSnake("camelToSnake")).toEqual("camel_to_snake");
  expect(camelToSnake("camel_to_snake")).toEqual("camel_to_snake");
  expect(camelToSnake("camelTo_snake")).toEqual("camel_to_snake");
});
