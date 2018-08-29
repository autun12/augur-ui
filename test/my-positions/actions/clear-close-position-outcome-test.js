import {
  CLEAR_CLOSE_POSITION_OUTCOME,
  clearClosePositionOutcome
} from "modules/my-positions/actions/clear-close-position-outcome";

describe("modules/my-positions/actions/clear-close-position-outcome.js", () => {
  describe("clearClosePositionTradeGroup", () => {
    const test = t => {
      test(t.description, () => {
        t.assertions(
          clearClosePositionOutcome(t.arguments.marketId, t.arguments.outcomeId)
        );
      });
    };

    test({
      description: "should return the expected object",
      arguments: {
        marketId: "0xMarketId",
        outcomeId: "1"
      },
      assertions: res => {
        expect(res).toEqual({
          type: CLEAR_CLOSE_POSITION_OUTCOME,
          marketId: "0xMarketId",
          outcomeId: "1"
        });
      }
    });
  });
});
