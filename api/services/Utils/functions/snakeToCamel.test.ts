import snakeToCamel from "./snakeToCamel";

describe("snakeToCamel function", () => {
  test("Should return the value unchanged if string is empty", () => {
    expect(snakeToCamel("")).toEqual("");
  });

  test("Should transform from snake case to camel case", () => {
    expect(snakeToCamel("snake_to_camel")).toEqual("snakeToCamel");
    expect(snakeToCamel("snake_toCamel")).toEqual("snakeToCamel");
  });
});
