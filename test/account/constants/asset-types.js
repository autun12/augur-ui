import { ETH, REP } from "modules/account/constants/asset-types";

describe("modules/account/constants/asset-types.js", () => {
  test(`ETH should return the expected string`, () => {
    const expected = "ETH";

    expect(ETH).toBe(expected);
  });

  test(`REP should return the expected string`, () => {
    const expected = "REP";

    expect(REP).toBe(expected);
  });
});
