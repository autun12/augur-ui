import configureMockStore from "redux-mock-store";
import proxyquire from "proxyquire";
import sinon from "sinon";
import thunk from "redux-thunk";

describe(`modules/auth/actions/update-login-account.js`, () => {
  proxyquire.noPreserveCache();
  let mockStore;
  beforeEach(() => {
    mockStore = configureMockStore([thunk]);
  });

  test("should fire a UPDATE_LOGIN_ACCOUNT action type with data", () => {
    const store = mockStore({});
    const UpdateFromAddress = { updateFromAddress: () => {} };
    const action = proxyquire(
      "../../../src/modules/auth/actions/update-login-account.js",
      {
        "../../contracts/actions/update-contract-api": UpdateFromAddress
      }
    );
    sinon
      .stub(UpdateFromAddress, "updateFromAddress")
      .callsFake(address => ({ type: "UPDATE_FROM_ADDRESS", address }));
    store.dispatch(action.updateLoginAccount({ address: "0xb0b" }));

    const actions = store.getActions();

    const output = [
      {
        type: "UPDATE_LOGIN_ACCOUNT",
        data: {
          loginAccount: { address: "0xb0b" }
        }
      },
      {
        type: "UPDATE_FROM_ADDRESS",
        address: "0xb0b"
      }
    ];
    expect(actions).toEqual(output);

    store.clearActions();
  });

  test("should fire a CLEAR_LOGIN_ACCOUNT action type", () => {
    const store = mockStore({});
    const UpdateFromAddress = { updateFromAddress: () => {} };
    const action = proxyquire(
      "../../../src/modules/auth/actions/update-login-account.js",
      {
        "../../contracts/actions/update-contract-api": UpdateFromAddress
      }
    );
    sinon
      .stub(UpdateFromAddress, "updateFromAddress")
      .callsFake(address => ({ type: "UPDATE_FROM_ADDRESS", address }));
    store.dispatch(action.clearLoginAccount({ address: "0xb0b" }));

    const actions = store.getActions();

    const output = [
      {
        type: "CLEAR_LOGIN_ACCOUNT"
      }
    ];
    expect(actions).toEqual(output);

    store.clearActions();
  });
});
