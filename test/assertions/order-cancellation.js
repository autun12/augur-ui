export default function(orderCancellation) {
  describe("orderCancellation", () => {
    test("orderCancellation", () => {
      assert.isObject(orderCancellation);
    });

    test("orderCancellation.cancelOrder", () => {
      assert.isFunction(orderCancellation.cancelOrder);
    });

    test("orderCancellation.abortCancelOrderConfirmation", () => {
      assert.isFunction(orderCancellation.abortCancelOrderConfirmation);
    });

    test("orderCancellation.showCancelOrderConfirmation", () => {
      assert.isFunction(orderCancellation.showCancelOrderConfirmation);
    });

    test("orderCancellation.cancellationStatuses", () => {
      assert.isObject(orderCancellation.cancellationStatuses);
      assert.deepEqual(orderCancellation.cancellationStatuses, {
        CANCELLATION_CONFIRMATION: "CANCELLATION_CONFIRMATION",
        CANCELLING: "CANCELLING",
        CANCELLED: "CANCELLED",
        CANCELLATION_FAILED: "CANCELLATION_FAILED"
      });
    });
  });
}
