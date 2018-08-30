import assertFormattedNumber from "assertions/common/formatted-number";
import assertFormattedDate from "assertions/common/formatted-date";

export default function(myMarkets) {
  describe(`myMarkets' shape`, () => {
    assert.isDefined(myMarkets);
    assert.isArray(myMarkets);

    myMarkets.forEach(market => {
      assertMyMarkets(market);
    });
  });
}

export function assertMyMarkets(market) {
  describe(`myMarket's shape`, () => {
    test("id", () => {
      assert.isDefined(market.id);
      assert.isString(market.id);
    });

    test("description", () => {
      assert.isDefined(market.description);
      assert.isString(market.description);
    });

    test("endTime", () => {
      assert.isDefined(market.endTime);

      assertFormattedDate(market.endTime, "loginAccountMarkets.endTime");
    });

    test("fees", () => {
      assert.isDefined(market.fees);

      assertFormattedNumber(market.fees, "loginAccountMarkets.fees");
    });

    test("volume", () => {
      assert.isDefined(market.volume);

      assertFormattedNumber(market.volume, "loginAccountMarkets.volume");
    });

    test("numberOfTrades", () => {
      assert.isDefined(market.numberOfTrades);

      assertFormattedNumber(
        market.numberOfTrades,
        "loginAccountMarkets.numberOfTrades"
      );
    });

    test("averageTradeSize", () => {
      assert.isDefined(market.averageTradeSize);

      assertFormattedNumber(
        market.averageTradeSize,
        "loginAccountMarkets.averageTradeSize"
      );
    });

    test("openVolume", () => {
      assert.isDefined(market.openVolume);

      assertFormattedNumber(
        market.openVolume,
        "loginAccountMarkets.openVolume"
      );
    });
  });
}
