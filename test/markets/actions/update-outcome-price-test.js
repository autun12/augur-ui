import * as action from "modules/markets/actions/update-outcome-price";

describe(`modules/markets/actions/update-outcome-price.js`, () => {
  test(`should return an update outcome price action`, () => {
    const marketId = "123";
    const outcomeId = "456";
    const price = 6.44;
    const expectedOutput = {
      type: action.UPDATE_OUTCOME_PRICE,
      marketId,
      outcomeId,
      price
    };
    expect(action.updateOutcomePrice(marketId, outcomeId, price)).toEqual(
      expectedOutput
    );
  });
});
