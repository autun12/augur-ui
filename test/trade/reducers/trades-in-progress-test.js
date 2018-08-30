import reducer from "modules/trade/reducers/trades-in-progress";
import {
  UPDATE_TRADE_IN_PROGRESS,
  CLEAR_TRADE_IN_PROGRESS
} from "modules/trade/actions/update-trades-in-progress";
import { CLEAR_LOGIN_ACCOUNT } from "modules/auth/actions/update-login-account";

describe(`modules/trade/reducers/trade-in-progress.js`, () => {
  const testState = {
    MarketId: {
      MarketId: "testStateMarketId",
      OutcomeId: {
        test: 1
      }
    },
    MarketID2: {
      MarketID2: "testStateMarketID2",
      OutcomeId: {
        test: 2
      }
    }
  };

  test(`should clear the login account `, () => {
    const testAction = {
      type: CLEAR_LOGIN_ACCOUNT
    };

    const expectedState = {};

    expect(reducer(testState, testAction)).toEqual(expectedState);
  });

  test(`should be able to update a trade in progress`, () => {
    const testAction = {
      type: UPDATE_TRADE_IN_PROGRESS,
      data: {
        marketId: "MarketId",
        outcomeId: "OutcomeId",
        details: {
          details: "something here"
        }
      }
    };

    const expectedState = {
      MarketId: {
        MarketId: "testStateMarketId",
        OutcomeId: {
          details: "something here"
        }
      },
      MarketID2: {
        MarketID2: "testStateMarketID2",
        OutcomeId: {
          test: 2
        }
      }
    };

    expect(reducer(testState, testAction)).toEqual(expectedState);
  });

  test(`should be able to clear a trade in progress`, () => {
    const testAction = {
      type: CLEAR_TRADE_IN_PROGRESS,
      marketId: "MarketID2"
    };

    const expectedState = {
      MarketId: {
        MarketId: "testStateMarketId",
        OutcomeId: {
          test: 1
        }
      },
      MarketID2: {}
    };

    expect(reducer(testState, testAction)).toEqual(expectedState);
  });
});
