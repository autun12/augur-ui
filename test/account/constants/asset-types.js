import { ETH, REP } from "modules/account/constants/asset-types";

describe("modules/account/constants/asset-types.js", () => {
  const test = t => test(t.description, () => t.assertions());

  test({
    description: `ETH should return the expected string`,
    assertions: () => {
      const expected = "ETH";

      expect(ETH).toBe(expected);
    }
  });

  test({
    description: `REP should return the expected string`,
    assertions: () => {
      const expected = "REP";

      expect(REP).toBe(expected);
    }
  });
});
