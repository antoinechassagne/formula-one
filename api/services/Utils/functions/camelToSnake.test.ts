import camelToSnake from "./camelToSnake";

describe("camelToSnake function", () => {
  test("Should return the value unchanged if string is empty", () => {
    expect(camelToSnake("")).toEqual("");
  });

  test("Should transform from camel case to snake case", () => {
    expect(camelToSnake("camelToSnake")).toEqual("camel_to_snake");
    expect(camelToSnake("camel_to_snake")).toEqual("camel_to_snake");
    expect(camelToSnake("camelTo_snake")).toEqual("camel_to_snake");
  });
});
