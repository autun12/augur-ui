import {
  CLEAR_CLOSE_POSITION_OUTCOME,
  clearClosePositionOutcome
} from "modules/my-positions/actions/clear-close-position-outcome";

describe("modules/my-positions/actions/clear-close-position-outcome.js", () => {
  describe("clearClosePositionTradeGroup", () => {
    test("should return the expected object", () => {
      const res = clearClosePositionOutcome("0xMarketId", "1");
      expect(res).toEqual({
        type: CLEAR_CLOSE_POSITION_OUTCOME,
        marketId: "0xMarketId",
        outcomeId: "1"
      });
    });
  });
});
