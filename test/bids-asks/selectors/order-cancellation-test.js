import mocks from "test/mockStore";

describe("modules/bids-asks/selectors/order-cancellation.js", () => {
  proxyquire.noPreserveCache().noCallThru();

  const { store } = mocks;
  const orderCancellationSelector = jest.mock(
    "../../../src/modules/bids-asks/selectors/order-cancellation",
    {
      "../../../store": store
    }
  ).default;

  test("should select correct values", () => {
    const orderCancellation = orderCancellationSelector();
    assert.isFunction(orderCancellation.cancelOrder);
    assert.propertyVal(orderCancellation, "an orderId", "a status");
    expect(Object.keys(orderCancellation)).toHaveLength(2);
  });
});
