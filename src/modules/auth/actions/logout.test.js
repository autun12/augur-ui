import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import testState from "test/testState";
import { logout } from "modules/auth/actions/logout";
import { augur } from "services/augurjs";

describe(`modules/auth/actions/logout.js`, () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  beforeEach(() => {
    jest.spyOn(augur.rpc, "clear").mockImplementation(() => {});
  });

  test(`should logout of the logged in account`, () => {
    const store = mockStore(testState);
    augur.rpc.clear = jest.fn();

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
