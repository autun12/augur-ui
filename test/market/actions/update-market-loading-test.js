import {
  UPDATE_MARKET_LOADING,
  REMOVE_MARKET_LOADING,
  updateMarketLoading,
  removeMarketLoading
} from "modules/market/actions/update-market-loading";

describe("modules/market/actions/update-market-loading.js", () => {
  describe("updateMarketLoading", () => {
    test("should return the expected object", () => {
      const actual = updateMarketLoading("0xMARKETID");
      const expected = {
        type: UPDATE_MARKET_LOADING,
        data: "0xMARKETID"
      };

      expect(actual).toEqual(expected);
    });
  });

  describe("removeMarketLoading", () => {
    test("should return the expected object", () => {
      const actual = removeMarketLoading("0xMARKETID");
      const expected = {
        type: REMOVE_MARKET_LOADING,
        data: "0xMARKETID"
      };

      expect(actual).toEqual(expected);
    });
  });
});
