import { ETH, REP } from "modules/account/constants/asset-types";

describe("modules/account/constants/asset-types.js", () => {
  const test = t => test(t.description, () => t.assertions());

  test(`ETH should return the expected string`, () => {
    const expected = "ETH";

    assert.strictEqual(ETH, expected, `didn't return the expected string`);
  });

  test(`REP should return the expected string`, () => {
    const expected = "REP";

    assert.strictEqual(REP, expected, `didn't return the expected string`);
  });
});
