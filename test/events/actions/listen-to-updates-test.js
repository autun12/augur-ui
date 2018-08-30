import mockStore from "test/mockStore";
import {
  listenToUpdates,
  __RewireAPI__ as RewireListenToUpdates
} from "modules/events/actions/listen-to-updates";
import { __RewireAPI__ as RewireLogHandlers } from "modules/events/actions/log-handlers";

describe("events/actions/listen-to-updates", () => {
  describe("setup shape tests", () => {
    const ACTIONS = {
      STOP_BLOCK_LISTENERS: { type: "STOP_BLOCK_LISTENERS" },
      STOP_AUGUR_NODE_EVENT_LISTENERS: {
        type: "STOP_AUGUR_NODE_EVENT_LISTENERS"
      },
      START_BLOCK_LISTENERS: { type: "START_BLOCK_LISTENERS" },
      START_AUGUR_NODE_EVENT_LISTENERS: {
        type: "START_AUGUR_NODE_EVENT_LISTENERS"
      },
      NODES_AUGUR_ON_SET: { type: "NODES_AUGUR_ON_SET" },
      NODES_ETHEREUM_ON_SET: { type: "NODES_ETHEREUM_ON_SET" }
    };
    const oldtest = t =>
      test(t.description, () => {
        const store = mockStore.mockStore({});
        RewireListenToUpdates.__Rewire__("augur", {
          events: {
            stopBlockListeners: () =>
              store.dispatch(ACTIONS.STOP_BLOCK_LISTENERS),
            stopAugurNodeEventListeners: () =>
              store.dispatch(ACTIONS.STOP_AUGUR_NODE_EVENT_LISTENERS),
            startBlockListeners: listeners => {
              expect(typeof listeners.onAdded).toBe("function");
              expect(typeof listeners.onRemoved).toBe("function");
              store.dispatch(ACTIONS.START_BLOCK_LISTENERS);
            },
            startAugurNodeEventListeners: listeners => {
              expect(typeof listeners.MarketState).toBe("function");
              expect(typeof listeners.InitialReportSubmitted).toBe("function");
              expect(typeof listeners.MarketCreated).toBe("function");
              expect(typeof listeners.TokensTransferred).toBe("function");
              expect(typeof listeners.OrderCanceled).toBe("function");
              expect(typeof listeners.OrderCreated).toBe("function");
              expect(typeof listeners.OrderFilled).toBe("function");
              expect(typeof listeners.TradingProceedsClaimed).toBe("function");
              expect(typeof listeners.MarketFinalized).toBe("function");
              expect(typeof listeners.UniverseForked).toBe("function");
              expect(typeof listeners.FeeWindowCreated).toBe("function");
              store.dispatch(ACTIONS.START_AUGUR_NODE_EVENT_LISTENERS);
            },
            nodes: {
              augur: {
                on: (label, onDisconnect) => {
                  expect(label).toBe("disconnect");
                  expect(typeof onDisconnect).toBe("function");
                  store.dispatch(ACTIONS.NODES_AUGUR_ON_SET);
                }
              },
              ethereum: {
                on: (label, onDisconnect) => {
                  expect(label).toBe("disconnect");
                  expect(typeof onDisconnect).toBe("function");
                  store.dispatch(ACTIONS.NODES_ETHEREUM_ON_SET);
                }
              }
            }
          }
        });
        store.dispatch(listenToUpdates({}));
        t.assertions(store.getActions());
      });
    test("it should handle clearing all listeners then setting all listeners when called.", actions =>
      expect(actions).toEqual([
        ACTIONS.STOP_BLOCK_LISTENERS,
        ACTIONS.STOP_AUGUR_NODE_EVENT_LISTENERS,
        ACTIONS.START_BLOCK_LISTENERS,
        ACTIONS.START_AUGUR_NODE_EVENT_LISTENERS,
        ACTIONS.NODES_AUGUR_ON_SET,
        ACTIONS.NODES_ETHEREUM_ON_SET
      ]));
  });
  describe("MarketState", () => {
    const oldtest = t =>
      test(t.description, () => {
        const store = mockStore.mockStore(t.state);
        RewireLogHandlers.__Rewire__("loadMarketsInfo", marketIds => ({
          type: "LOAD_MARKETS_INFO",
          marketIds
        }));
        RewireListenToUpdates.__Rewire__("augur", t.stub.augur);
        store.dispatch(listenToUpdates({}));
        t.assertions(store.getActions());
      });
    test({
      description: "it should handle calling market state change",
      state: {
        universe: { id: "UNIVERSE_ADDRESS" }
      },
      stub: {
        augur: {
          events: {
            stopBlockListeners: () => {},
            stopAugurNodeEventListeners: () => {},
            startBlockListeners: () => {},
            startAugurNodeEventListeners: listeners =>
              listeners.MarketState(null, {
                marketId: "MARKET_ADDRESS",
                universe: "UNIVERSE_ADDRESS"
              }),
            nodes: { augur: { on: () => {} }, ethereum: { on: () => {} } }
          }
        }
      },
      assertions: actions =>
        expect(actions).toEqual([
          { type: "LOAD_MARKETS_INFO", marketIds: ["MARKET_ADDRESS"] }
        ])
    });
  });
  describe("InitialReportSubmitted", () => {
    const oldtest = t =>
      test(t.description, () => {
        const store = mockStore.mockStore(t.state);
        RewireLogHandlers.__Rewire__("loadMarketsInfo", marketIds => ({
          type: "LOAD_MARKETS_INFO",
          marketIds
        }));
        RewireLogHandlers.__Rewire__("loadUnclaimedFees", marketIds => ({
          type: "UPDATE_UNCLAIMED_DATA",
          marketIds
        }));
        RewireLogHandlers.__Rewire__("updateLoggedTransactions", log => ({
          type: "UPDATE_LOGGED_TRANSACTIONS",
          log
        }));
        RewireLogHandlers.__Rewire__("updateAssets", () => ({
          type: "UPDATE_ASSETS"
        }));
        RewireLogHandlers.__Rewire__("loadReporting", () => ({
          type: "LOAD_REPORTING"
        }));
        RewireListenToUpdates.__Rewire__("augur", t.stub.augur);
        store.dispatch(listenToUpdates({}));
        t.assertions(store.getActions());
      });
    test({
      description:
        "it should handle calling initial report not designated reporter",
      state: {
        universe: { id: "UNIVERSE_ADDRESS" },
        loginAccount: { address: "MY_ADDRESS" }
      },
      stub: {
        augur: {
          events: {
            stopBlockListeners: () => {},
            stopAugurNodeEventListeners: () => {},
            startBlockListeners: () => {},
            startAugurNodeEventListeners: listeners =>
              listeners.InitialReportSubmitted(null, {
                eventName: "InitialReportSubmitted",
                market: "MARKET_ADDRESS",
                reporter: "REPORTER_ADDRESS",
                universe: "UNIVERSE_ADDRESS"
              }),
            nodes: { augur: { on: () => {} }, ethereum: { on: () => {} } }
          }
        }
      },
      assertions: actions =>
        expect(actions).toEqual([
          { type: "LOAD_MARKETS_INFO", marketIds: ["MARKET_ADDRESS"] },
          { type: "UPDATE_UNCLAIMED_DATA", marketIds: ["MARKET_ADDRESS"] },
          { type: "LOAD_REPORTING" }
        ])
    });
    test({
      description:
        "it should handle calling initial report IS designated reporter",
      state: {
        universe: { id: "UNIVERSE_ADDRESS" },
        loginAccount: { address: "MY_ADDRESS" }
      },
      stub: {
        augur: {
          events: {
            stopBlockListeners: () => {},
            stopAugurNodeEventListeners: () => {},
            startBlockListeners: () => {},
            startAugurNodeEventListeners: listeners =>
              listeners.InitialReportSubmitted(null, {
                eventName: "InitialReportSubmitted",
                market: "MARKET_ADDRESS",
                reporter: "MY_ADDRESS",
                universe: "UNIVERSE_ADDRESS"
              }),
            nodes: { augur: { on: () => {} }, ethereum: { on: () => {} } }
          }
        }
      },
      assertions: actions =>
        expect(actions).toEqual([
          { type: "LOAD_MARKETS_INFO", marketIds: ["MARKET_ADDRESS"] },
          { type: "UPDATE_UNCLAIMED_DATA", marketIds: ["MARKET_ADDRESS"] },
          { type: "LOAD_REPORTING" },
          {
            type: "UPDATE_LOGGED_TRANSACTIONS",
            log: {
              eventName: "InitialReportSubmitted",
              market: "MARKET_ADDRESS",
              reporter: "MY_ADDRESS",
              universe: "UNIVERSE_ADDRESS"
            }
          }
        ])
    });
  });
});
