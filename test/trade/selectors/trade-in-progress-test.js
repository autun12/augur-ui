import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import realSelector from "modules/trade/selectors/trade-in-progress";

describe(`modules/trade/selectors/trade-in-progress.js`, () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const testState = {
    selectedMarketId: "testmarket",
    tradesInProgress: {
      testmarket: "this is a test"
    }
  };
  const store = mockStore(testState);

  const selector = jest.mock(
    "../../../src/modules/trade/selectors/trade-in-progress",
    {
      "../../../store": store
    }
  );

  test(`should return tradesInProgress[selectedMarketId] if available`, () => {
    expect(selector.default()).toEqual("this is a test");
  });

  test(`should return undefined if tradesInProgress[selectedMarketId] doesn't exist`, () => {
    assert.isUndefined(
      realSelector(),
      `isn't undefined as expected with blank state`
    );
  });
});
