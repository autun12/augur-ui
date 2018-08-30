import trimString from "utils/trim-string";

describe("utils/trim-string", () => {
  const test = t => test(t.description, () => t.assertions());

  test({
    description: `should return null when argument is undefined`,
    assertions: () => {
      const actual = trimString();

      const expected = null;

      expect(actual).toBe(expected);
    }
  });

  test({
    description: `should return a trimmed string`,
    assertions: () => {
      const actual = trimString("string to be trimmed");

      const expected = "stri...";

      expect(actual).toBe(expected);
    }
  });
});
