import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { createBigNumber } from "utils/create-big-number";

import { ZERO } from "modules/trade/constants/numbers";

describe("modules/user-open-orders/selectors/positions-plus-asks", () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  const test = t => {
    test(t.description, () => {
      const store = mockStore(t.state || {});
      t.assertions(store);
    });
  };

  describe("selectAccountPositions", () => {
    const positionsPlusAsks = require("modules/user-open-orders/selectors/positions-plus-asks");

    positionsPlusAsks.__Rewire__(
      "selectPositionsPlusAsks",
      () => "selectPositionsPlusAsks"
    );

    test(`should call the expected methods`, () => {
      const actual = positionsPlusAsks.default();

      const expected = "selectPositionsPlusAsks";

      expect(actual).toBe(expected);
    });
  });

  describe("selectPositionsPlusAsks", () => {
    const positionsPlusAsks = require("modules/user-open-orders/selectors/positions-plus-asks");

    positionsPlusAsks.__Rewire__(
      "selectMarketPositionPlusAsks",
      () => "selectMarketPositionPlusAsks"
    );

    test({
      description: `should return the expected value with no positions`,
      state: {
        loginAccount: {}
      },
      assertions: store => {
        const actual = positionsPlusAsks.selectPositionsPlusAsks(
          store.getState()
        );

        const expected = null;

        expect(actual).toBe(expected);
      }
    });

    test({
      description: `should return the expected value with positions and no market order book`,
      state: {
        loginAccount: {},
        accountPositions: {
          "0xMARKETID": {}
        },
        orderBooks: {}
      },
      assertions: store => {
        const actual = positionsPlusAsks.selectPositionsPlusAsks(
          store.getState()
        );

        const expected = {
          "0xMARKETID": {}
        };

        expect(actual).toEqual(expected);
      }
    });

    test({
      description: `should return the expected value with positions and market order book`,
      state: {
        loginAccount: {},
        accountPositions: {
          "0xMARKETID": {}
        },
        orderBooks: {
          "0xMARKETID": {
            sell: [{}]
          }
        }
      },
      assertions: store => {
        const actual = positionsPlusAsks.selectPositionsPlusAsks(
          store.getState()
        );

        const expected = {
          "0xMARKETID": "selectMarketPositionPlusAsks"
        };

        expect(actual).toEqual(expected);
      }
    });
  });

  describe("selectMarketPositionPlusAsks", () => {
    const positionsPlusAsks = require("modules/user-open-orders/selectors/positions-plus-asks");

    positionsPlusAsks.__Rewire__("getOpenAskShares", () => 1);

    test(`should return the expected value without asks passed in`, () => {
      const actual = positionsPlusAsks.selectMarketPositionPlusAsks();

      const expected = {};

      expect(actual).toEqual(expected);
    });

    test(`should return the expected value with asks passed in`, () => {
      const actual = positionsPlusAsks.selectMarketPositionPlusAsks(
        null,
        { 1: "1" },
        {}
      );

      const expected = {
        1: "2"
      };

      expect(actual).toEqual(expected);
    });
  });

  describe("getOpenAskShares", () => {
    const positionsPlusAsks = require("modules/user-open-orders/selectors/positions-plus-asks");

    test(`should return the expected value without account passed`, () => {
      const actual = positionsPlusAsks.getOpenAskShares();

      const expected = ZERO;

      expect(actual).toEqual(expected);
    });

    test(`should return the expected value without askOrders passed`, () => {
      const actual = positionsPlusAsks.getOpenAskShares("0xUSERADDRESS", 1);

      const expected = ZERO;

      expect(actual).toEqual(expected);
    });

    test(`should return the expected value`, () => {
      const actual = positionsPlusAsks.getOpenAskShares("0xUSERADDRESS", 1, {
        "0xORDER1": {
          owner: "0xUSERADDRESS",
          outcome: 1,
          amount: "1"
        },
        "0xORDER2": {
          owner: "0xNOTUSERADDRESS",
          outcome: 1,
          amount: "1"
        },
        "0xORDER3": {
          owner: "0xUSERADDRESS",
          outcome: 2,
          amount: "1"
        },
        "0xORDER4": {
          owner: "0xUSERADDRESS",
          outcome: 1,
          amount: "1"
        }
      });

      const expected = createBigNumber("2");

      expect(actual).toEqual(expected);
    });
  });
});
