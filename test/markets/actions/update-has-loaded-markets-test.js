import {
  updateHasLoadedMarkets,
  UPDATE_HAS_LOADED_MARKETS
} from "modules/markets/actions/update-has-loaded-markets";

describe("modules/markets/actions/update-has-loaded-markets.js", () => {
  const test = t => {
    test(t.description, () => {
      t.assertions(updateHasLoadedMarkets(t.hasLoadedMarkets));
    });
  };

  test({
    description: "should return the expected object",
    hasLoadedMarkets: true,
    assertions: action => {
      const expected = {
        type: UPDATE_HAS_LOADED_MARKETS,
        hasLoadedMarkets: true
      };

      expect(action).toEqual(expected);
    }
  });
});
