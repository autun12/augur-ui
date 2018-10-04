import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { loadAccountDataFromLocalStorage } from "modules/auth/actions/load-account-data-from-local-storage";
import { updateLoginAccount } from "modules/auth/actions/update-login-account";
import { loadAccountTrades } from "modules/positions/actions/load-account-trades";
import { checkAccountAllowance } from "modules/auth/actions/approve-account";
import { loadAccountData } from "modules/auth/actions/load-account-data";
import { loadReportingWindowBounds } from "modules/reports/actions/load-reporting-window-bounds";

jest.mock("modules/auth/actions/load-account-data-from-local-storage");
jest.mock("modules/auth/actions/update-assets");
jest.mock("modules/auth/actions/update-login-account");
jest.mock("modules/positions/actions/load-account-trades");
jest.mock("modules/auth/actions/approve-account");
jest.mock("modules/reports/actions/load-reporting-window-bounds");

describe(`modules/auth/actions/load-account-data.js`, () => {
  let mockStore;
  beforeEach(() => {
    mockStore = configureMockStore([thunk]);

    loadAccountDataFromLocalStorage.mockReturnValue({
      type: "LOAD_ACCOUNT_DATA_FROM_LOCAL_STORAGE"
    });
    updateLoginAccount.mockImplementation(data => ({
      type: "UPDATE_LOGIN_ACCOUNT",
      data
    }));
    loadAccountTrades.mockReturnValue({ type: "UPDATE_ACCOUNT_TRADES_DATA" });
    checkAccountAllowance.mockReturnValue({
      type: "CHECK_ACCOUNT_ALLOWANCE"
    });

    // This doesn't action makes an RPC call in the real world.
    // We are Just faking the action here to ensure it was called.
    loadReportingWindowBounds.mockReturnValue({
      type: "LOAD_REPORTING_WINDOW_BOUNDS"
    });
  });
  test("no account", () => {
    const store = mockStore({});

    store.dispatch(loadAccountData(null));
    expect(store.getActions()).toEqual([]);
  });
  test("account without address", () => {
    const store = mockStore({});

    store.dispatch(loadAccountData({ name: "jack" }));
    expect(store.getActions()).toEqual([]);
  });
  test("account address", () => {
    const store = mockStore({
      loginAccount: {
        address: "0xb0b"
      },
      universe: {
        id: "0xdeadbeef"
      }
    });

    const data = {
      address: "0xb0b",
      meta: {
        accountType: "UNKNOWN_TYPE"
      }
    };

    store.dispatch(loadAccountData(data));
    expect(store.getActions()).toEqual([
      { type: "LOAD_ACCOUNT_DATA_FROM_LOCAL_STORAGE" },
      { type: "CLEAR_TRANSACTION_DATA" },
      { type: "UPDATE_LOGIN_ACCOUNT", data },
      { type: "UPDATE_ACCOUNT_TRADES_DATA" },
      { type: "CHECK_ACCOUNT_ALLOWANCE" },
      { type: "UPDATE_ASSETS" },
      { type: "LOAD_REPORTING_WINDOW_BOUNDS" }
    ]);
  });
  test("account with address, loginId, name, isUnlocked, edgeAccount", () => {
    const store = mockStore({
      loginAccount: {
        address: "0xb0b"
      },
      universe: {
        id: "0xdeadbeef"
      }
    });

    const data = {
      address: "0xb0b",
      name: "jack",
      isUnlocked: true,
      edgeAccount: { username: "jack" },
      meta: {
        accountType: "UNKNOWN_TYPE"
      }
    };

    store.dispatch(loadAccountData(data));
    expect(store.getActions()).toEqual([
      { type: "LOAD_ACCOUNT_DATA_FROM_LOCAL_STORAGE" },
      { type: "CLEAR_TRANSACTION_DATA" },
      {
        type: "UPDATE_LOGIN_ACCOUNT",
        data
      },
      { type: "UPDATE_ACCOUNT_TRADES_DATA" },
      { type: "CHECK_ACCOUNT_ALLOWANCE" },
      { type: "UPDATE_ASSETS" },
      { type: "LOAD_REPORTING_WINDOW_BOUNDS" }
    ]);
  });
});
