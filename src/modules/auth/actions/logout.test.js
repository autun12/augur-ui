import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import testState from "test/testState";
import { augur } from "services/augurjs";

jest.mock("services/augurjs");

import { logout } from "modules/auth/actions/logout";

describe(`modules/auth/actions/logout.js`, () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const fakeAugurJS = { augur: { rpc: {} } };
  const store = mockStore(testState);
  fakeAugurJS.augur.rpc.clear = () => {};

  test(`should logout of the logged in account`, () => {
    const expectedOutput = [
      {
        type: "CLEAR_TRANSACTION_DATA"
      },
      {
        type: "CLEAR_LOGIN_ACCOUNT"
      }
    ];
    store.dispatch(logout());
    expect(store.getActions()).toEqual(expectedOutput);
  });
});
