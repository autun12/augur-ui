import hasLoadedMarkets from "modules/markets/reducers/has-loaded-markets";

import { UPDATE_HAS_LOADED_MARKETS } from "modules/markets/actions/update-has-loaded-markets";

describe("modules/markets/reducers/has-loaded-markets.js", () => {
  const test = t => {
    test(t.describe, () => {
      t.assertions();
    });
  };

  test({
    describe: "should return the default value",
    assertions: () => {
      const actual = hasLoadedMarkets(undefined, { type: null });

      const expected = false;

      expect(actual).toEqual(expected);
    }
  });

  test({
    describe: "should return the existing value",
    assertions: () => {
      const actual = hasLoadedMarkets(true, { type: null });

      const expected = true;

      expect(actual).toEqual(expected);
    }
  });

  test({
    describe: "should return the updated value",
    assertions: () => {
      const actual = hasLoadedMarkets(true, {
        type: UPDATE_HAS_LOADED_MARKETS,
        hasLoadedMarkets: false
      });

      const expected = false;

      expect(actual).toEqual(expected);
    }
  });
});
