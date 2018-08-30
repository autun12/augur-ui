import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

describe(`modules/bids-asks/actions/load-one-outcome-bids-asks.js`, () => {
  const test = t =>
    test(t.description, done => {
      const store = configureMockStore([thunk])({});
      const loadOneOutcomeBidsAsks = jest.mock(
        "../../../src/modules/bids-asks/actions/load-one-outcome-bids-asks",
        {
          "./load-one-outcome-bids-or-asks": t.stub.loadOneOutcomeBidsOrAsks
        }
      ).default;
      store.dispatch(
        loadOneOutcomeBidsAsks(t.params.marketId, t.params.outcome, err => {
          t.assertions(err, store.getActions());
          store.clearActions();
          done();
        })
      );
    });
  test({
    description: "short-circuit if market ID not provided",
    params: {
      marketId: null,
      outcome: 3
    },
    stub: {
      loadOneOutcomeBidsOrAsks: {
        default: () => () => expect(false).toBeTruthy()
      }
    },
    assertions: (err, actions) => {
      expect(err).toBe("must specify market ID and outcome: null 3");
      expect(actions).toEqual([]);
    }
  });
  test({
    description: "short-circuit if outcome not provided",
    params: {
      marketId: "MARKET_0",
      outcome: null
    },
    stub: {
      loadOneOutcomeBidsOrAsks: {
        default: () => () => expect(false).toBeTruthy()
      }
    },
    assertions: (err, actions) => {
      expect(err).toBe("must specify market ID and outcome: MARKET_0 null");
      expect(actions).toEqual([]);
    }
  });
  test({
    description: "load bids and asks for single outcome",
    params: {
      marketId: "MARKET_0",
      outcome: 3
    },
    stub: {
      loadOneOutcomeBidsOrAsks: {
        default: (marketId, outcome, orderTypeLabel, callback) => dispatch => {
          dispatch({
            type: "LOAD_ONE_OUTCOME_BIDS_OR_ASKS",
            marketId,
            outcome,
            orderTypeLabel
          });
          callback(null);
        }
      }
    },
    assertions: (err, actions) => {
      expect(err).toBeNull();
      expect(actions).toEqual([
        {
          type: "LOAD_ONE_OUTCOME_BIDS_OR_ASKS",
          marketId: "MARKET_0",
          outcome: 3,
          orderTypeLabel: "buy"
        },
        {
          type: "LOAD_ONE_OUTCOME_BIDS_OR_ASKS",
          marketId: "MARKET_0",
          outcome: 3,
          orderTypeLabel: "sell"
        }
      ]);
    }
  });
  test({
    description: "propagate loadOneOutcomeBidsOrAsks error",
    params: {
      marketId: "MARKET_0",
      outcome: 3
    },
    stub: {
      loadOneOutcomeBidsOrAsks: {
        default: (marketId, outcome, orderTypeLabel, callback) => dispatch => {
          dispatch({
            type: "LOAD_ONE_OUTCOME_BIDS_OR_ASKS",
            marketId,
            outcome,
            orderTypeLabel
          });
          callback("ERROR_MESSAGE");
        }
      }
    },
    assertions: (err, actions) => {
      expect(err).toBe("ERROR_MESSAGE");
      expect(actions).toEqual([
        {
          type: "LOAD_ONE_OUTCOME_BIDS_OR_ASKS",
          marketId: "MARKET_0",
          outcome: 3,
          orderTypeLabel: "buy"
        }
      ]);
    }
  });
});
