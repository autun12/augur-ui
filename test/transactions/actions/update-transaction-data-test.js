import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import testState from "test/testState";

describe(`modules/transactions/actions/update-transactions-data.js`, () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  let out;
  const state = Object.assign({}, testState);
  const store = mockStore(state);
  const action = jest.mock(
    "../../../src/modules/transactions/actions/update-transactions-data",
    {}
  );
  test(`should fire update and process transaction actions`, () => {
    out = [
      {
        type: "UPDATE_TRANSACTIONS_DATA",
        transactionsData: {
          test: "testTransactionData"
        }
      }
    ];
    store.dispatch(
      action.updateTransactionsData({
        test: "testTransactionData"
      })
    );
    expect(store.getActions()).toEqual(out);
  });
});
