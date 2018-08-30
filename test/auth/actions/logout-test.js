import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import testState from "test/testState";

describe(`modules/auth/actions/logout.js`, () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const fakeAugurJS = { augur: { rpc: {} } };
  const store = mockStore(testState);
  fakeAugurJS.augur.rpc.clear = () => {};
  const action = jest.mock("../../../src/modules/auth/actions/logout", {
    "../../../services/augurjs": fakeAugurJS
  });

  test(`should logout of the logged in account`, () => {
    const expectedOutput = [
      {
        type: "CLEAR_LOGIN_ACCOUNT"
      }
    ];
    store.dispatch(action.logout());
    expect(store.getActions()).toEqual(expectedOutput);
  });
});
