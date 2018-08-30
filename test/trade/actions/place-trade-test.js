import sinon from "sinon";
import * as mocks from "test/mockStore";
import { tradeTestState } from "test/trade/constants";

describe(`modules/trade/actions/place-trade.js`, () => {
  test("should handle a null/undefined outcomeId", () => {
    const { state, mockStore } = mocks.default;
    const testState = { ...state, ...tradeTestState };
    testState.loginAccount = { privateKey: Buffer.from("PRIVATE_KEY", "utf8") };
    const store = mockStore(testState);
    const SelectMarket = { selectMarket: () => {} };
    sinon
      .stub(SelectMarket, "selectMarket")
      .callsFake(marketId => store.getState().marketsData[marketId]);
    const action = jest.mock(
      "../../../src/modules/trade/actions/place-trade.js",
      {
        "../../market/selectors/market": SelectMarket
      }
    );
    store.dispatch(action.placeTrade("testYesNoMarketId", null));
    expect(store.getActions()).toEqual([
      {
        type: "CLEAR_TRADE_IN_PROGRESS",
        marketId: "testYesNoMarketId"
      }
    ]);
    store.clearActions();
    store.dispatch(action.placeTrade("testYesNoMarketId", undefined));
    expect(store.getActions()).toEqual([
      {
        type: "CLEAR_TRADE_IN_PROGRESS",
        marketId: "testYesNoMarketId"
      }
    ]);
  });
  test("should handle a null/undefined marketId", () => {
    const { state, mockStore } = mocks.default;
    const testState = { ...state, ...tradeTestState };
    testState.loginAccount = { privateKey: Buffer.from("PRIVATE_KEY", "utf8") };
    const store = mockStore(testState);
    const SelectMarket = { selectMarket: () => {} };
    sinon
      .stub(SelectMarket, "selectMarket")
      .callsFake(marketId => store.getState().marketsData[marketId]);
    const action = jest.mock(
      "../../../src/modules/trade/actions/place-trade.js",
      {
        "../../market/selectors/market": SelectMarket
      }
    );
    store.dispatch(action.placeTrade(null, "1"));
    expect(store.getActions()).toEqual([]);
    store.clearActions();
    store.dispatch(action.placeTrade(undefined, "1"));
    expect(store.getActions()).toEqual([]);
  });
  test("should handle a allowance less than totalCost", () => {
    const { state, mockStore } = mocks.default;
    const testState = { ...state, ...tradeTestState };
    testState.loginAccount = {
      meta: { privateKey: Buffer.from("PRIVATE_KEY", "utf8") },
      allowance: "0"
    };
    const store = mockStore(testState);
    const CheckAccountAllowance = { checkAccountAllowance: () => {} };
    const SelectMarket = { selectMarket: () => {} };
    const checkAllownaceActionObject = {
      type: "UPDATE_LOGIN_ACCOUNT",
      allowance: "0"
    };
    sinon
      .stub(SelectMarket, "selectMarket")
      .callsFake(marketId => store.getState().marketsData[marketId]);
    sinon
      .stub(CheckAccountAllowance, "checkAccountAllowance")
      .callsFake(onSent => {
        onSent(null, "0");
        return checkAllownaceActionObject;
      });
    const action = jest.mock(
      "../../../src/modules/trade/actions/place-trade.js",
      {
        "../../market/selectors/market": SelectMarket,
        "../../auth/actions/approve-account": CheckAccountAllowance
      }
    );
    store.dispatch(
      action.placeTrade("testYesNoMarketId", "1", {
        totalCost: "10000000",
        sharesDepleted: "0",
        otherSharesDepleted: "0"
      })
    );
    const storeActions = store.getActions();
    // note this is backwards... mock needs to be changed.
    const approvalAction = storeActions[0];
    expect(storeActions).toHaveLength(2);
    // again, it should be first, but for now check 2nd.
    expect(storeActions[1]).toEqual(checkAllownaceActionObject);
    expect(typeof approvalAction).toBe("object");
    expect(approvalAction.type).toEqual("UPDATE_MODAL");
    expect(typeof approvalAction.data).toBe("object");
    expect(approvalAction.data.type).toEqual("MODAL_ACCOUNT_APPROVAL");
    expect(typeof approvalAction.data.approveCallback).toBe("function");
    store.clearActions();
  });
  test("should handle a allowance greater than total (no approval needed.)", () => {
    const { state, mockStore } = mocks.default;
    const testState = { ...state, ...tradeTestState };
    testState.loginAccount = {
      meta: { privateKey: Buffer.from("PRIVATE_KEY", "utf8") },
      allowance: "10000000000000000000000000000000000000000000"
    };
    const store = mockStore(testState);
    const CheckAccountAllowance = { checkAccountAllowance: () => {} };
    const SelectMarket = { selectMarket: () => {} };
    const AugurJS = { augur: { trading: { placeTrade: () => {} } } };
    const checkAllownaceActionObject = {
      type: "UPDATE_LOGIN_ACCOUNT",
      allowance: "10000000000000000000000000000000000000000000"
    };
    sinon
      .stub(SelectMarket, "selectMarket")
      .callsFake(marketId => store.getState().marketsData[marketId]);
    sinon
      .stub(CheckAccountAllowance, "checkAccountAllowance")
      .callsFake(() => checkAllownaceActionObject);
    sinon.stub(AugurJS.augur.trading, `placeTrade`).callsFake(params => {
      expect(typeof params).toBe("object");
      expect(typeof params.onSent).toBe("function");
      expect(typeof params.onSuccess).toBe("function");
      expect(typeof params.onFailed).toBe("function");
    });
    const action = jest.mock(
      "../../../src/modules/trade/actions/place-trade.js",
      {
        "../../market/selectors/market": SelectMarket,
        "../../auth/actions/approve-account": CheckAccountAllowance,
        "../../../services/augurjs": AugurJS
      }
    );
    store.dispatch(
      action.placeTrade("testYesNoMarketId", "1", {
        totalCost: "10000000",
        sharesDepleted: "0",
        otherSharesDepleted: "0"
      })
    );
    const storeActions = store.getActions();
    expect(storeActions).toHaveLength(1);
    const Expected = [
      {
        type: "CLEAR_TRADE_IN_PROGRESS",
        marketId: "testYesNoMarketId"
      }
    ];
    expect(storeActions).toEqual(Expected);
    store.clearActions();
  });
});
