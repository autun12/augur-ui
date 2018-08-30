import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

const order1 = { amount: "1" };
const order2 = { amount: "1.2" };
const marketsData = { MARKET_0: { minPrice: "0", maxPrice: "1" } };
const constants = { ORDER_STATE: { OPEN: "OPEN" } };

describe(`modules/bids-asks/actions/load-one-outcome-bids-or-asks.js`, () => {
  const test = t =>
    test(t.description, done => {
      const store = configureMockStore([thunk])({ ...t.mock.state });
      const loadOneOutcomeBidsOrAsks = jest.mock(
        "../../../src/modules/bids-asks/actions/load-one-outcome-bids-or-asks",
        {
          "../../../services/augurjs": t.stub.augurjs,
          "./insert-order-book-chunk-to-order-book":
            t.stub.insertOrderBookChunkToOrderBook
        }
      ).default;
      store.dispatch(
        loadOneOutcomeBidsOrAsks(
          t.params.marketId,
          t.params.outcome,
          t.params.orderTypeLabel,
          err => {
            t.assertions(err, store.getActions());
            store.clearActions();
            done();
          }
        )
      );
    });
  test({
    description: "short-circuit if market ID not provided",
    params: {
      marketId: undefined,
      outcome: 3,
      orderTypeLabel: "sell"
    },
    mock: {
      state: { marketsData }
    },
    stub: {
      augurjs: {
        augur: {
          constants,
          trading: {
            getOrders: () => expect(false).toBeTruthy()
          }
        }
      },
      insertOrderBookChunkToOrderBook: {
        default: () => () => expect(false).toBeTruthy()
      }
    },
    assertions: (err, actions) => {
      expect(err).toBe(
        "must specify market ID, outcome, and order type: undefined 3 sell"
      );
      expect(actions).toEqual([]);
    }
  });
  test({
    description: "short-circuit if outcome not provided",
    params: {
      marketId: "MARKET_0",
      outcome: undefined,
      orderTypeLabel: "sell"
    },
    mock: {
      state: { marketsData }
    },
    stub: {
      augurjs: {
        augur: {
          constants,
          trading: {
            getOrders: () => expect(false).toBeTruthy()
          }
        }
      },
      insertOrderBookChunkToOrderBook: {
        default: () => () => expect(false).toBeTruthy()
      }
    },
    assertions: (err, actions) => {
      expect(err).toBe(
        "must specify market ID, outcome, and order type: MARKET_0 undefined sell"
      );
      expect(actions).toEqual([]);
    }
  });
  test({
    description: "short-circuit if orderType not provided",
    params: {
      marketId: "MARKET_0",
      outcome: 3,
      orderType: undefined
    },
    mock: {
      state: { marketsData }
    },
    stub: {
      augurjs: {
        augur: {
          constants,
          trading: {
            getOrders: () => expect(false).toBeTruthy()
          }
        }
      },
      insertOrderBookChunkToOrderBook: {
        default: () => () => expect(false).toBeTruthy()
      }
    },
    assertions: (err, actions) => {
      expect(err).toBe(
        "must specify market ID, outcome, and order type: MARKET_0 3 undefined"
      );
      expect(actions).toEqual([]);
    }
  });
  test({
    description: "short-circuit if market data not found",
    params: {
      marketId: "MARKET_0",
      outcome: 3,
      orderTypeLabel: "sell"
    },
    mock: {
      state: { marketsData: {} }
    },
    stub: {
      augurjs: {
        augur: {
          constants,
          trading: {
            getOrders: () => expect(false).toBeTruthy()
          }
        }
      },
      insertOrderBookChunkToOrderBook: {
        default: () => () => expect(false).toBeTruthy()
      }
    },
    assertions: (err, actions) => {
      expect(err).toBe("market MARKET_0 data not found");
      expect(actions).toEqual([]);
    }
  });
  test({
    description: "no orders found",
    params: {
      marketId: "MARKET_0",
      outcome: 3,
      orderTypeLabel: "sell"
    },
    mock: {
      state: { marketsData }
    },
    stub: {
      augurjs: {
        augur: {
          constants,
          trading: {
            getOrders: (p, callback) => {
              callback(null, {});
            }
          }
        }
      },
      insertOrderBookChunkToOrderBook: {
        default: (
          marketId,
          outcome,
          orderTypeLabel,
          orderBookChunk
        ) => dispatch =>
          dispatch({
            type: "INSERT_ORDER_BOOK_CHUNK_TO_ORDER_BOOK",
            marketId,
            outcome,
            orderTypeLabel,
            orderBookChunk
          })
      }
    },
    assertions: (err, actions) => {
      expect(err).toBeNull();
      expect(actions).toEqual([
        {
          type: "UPDATE_IS_FIRST_ORDER_BOOK_CHUNK_LOADED",
          marketId: "MARKET_0",
          outcome: 3,
          orderTypeLabel: "sell",
          isLoaded: false
        },
        {
          type: "INSERT_ORDER_BOOK_CHUNK_TO_ORDER_BOOK",
          marketId: "MARKET_0",
          outcome: 3,
          orderTypeLabel: "sell",
          orderBookChunk: {}
        }
      ]);
    }
  });
  test({
    description: "load two orders",
    params: {
      marketId: "MARKET_0",
      outcome: 3,
      orderTypeLabel: "sell"
    },
    mock: {
      state: { marketsData }
    },
    stub: {
      augurjs: {
        augur: {
          constants,
          trading: {
            getOrders: (p, callback) => {
              callback(null, {
                MARKET_0: {
                  3: {
                    sell: {
                      "0x1": order1,
                      "0x2": order2
                    }
                  }
                }
              });
            }
          }
        }
      },
      insertOrderBookChunkToOrderBook: {
        default: (
          marketId,
          outcome,
          orderTypeLabel,
          orderBookChunk
        ) => dispatch =>
          dispatch({
            type: "INSERT_ORDER_BOOK_CHUNK_TO_ORDER_BOOK",
            marketId,
            outcome,
            orderTypeLabel,
            orderBookChunk
          })
      }
    },
    assertions: (err, actions) => {
      expect(err).toBeNull();
      expect(actions).toEqual([
        {
          type: "UPDATE_IS_FIRST_ORDER_BOOK_CHUNK_LOADED",
          marketId: "MARKET_0",
          outcome: 3,
          orderTypeLabel: "sell",
          isLoaded: false
        },
        {
          type: "INSERT_ORDER_BOOK_CHUNK_TO_ORDER_BOOK",
          marketId: "MARKET_0",
          outcome: 3,
          orderTypeLabel: "sell",
          orderBookChunk: { "0x1": order1, "0x2": order2 }
        }
      ]);
    }
  });
});
