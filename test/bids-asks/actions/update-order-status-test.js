import mocks from "test/mockStore";
import { CLOSE_DIALOG_CLOSING } from "modules/market/constants/close-dialog-status";
import { BUY } from "modules/transactions/constants/types";
import { updateOrderStatus } from "modules/bids-asks/actions/update-order-status";

describe("modules/bids-asks/actions/update-order-status.js", () => {
  proxyquire.noPreserveCache();
  const store = mocks.mockStore(mocks.state);
  afterEach(() => {
    store.clearActions();
  });
  describe("updateOrderStatus", () => {
    test(`shouldn't dispatch if order cannot be found`, () => {
      store.dispatch(
        updateOrderStatus(
          "nonExistingOrderId",
          CLOSE_DIALOG_CLOSING,
          "marketId",
          2,
          BUY
        )
      );
      expect(store.getActions()).toHaveLength(0);
      store.dispatch(
        updateOrderStatus(
          "orderId",
          CLOSE_DIALOG_CLOSING,
          "nonExistingMarketId",
          2,
          BUY
        )
      );
      expect(store.getActions()).toHaveLength(0);
    });
    test(`should dispatch action`, () => {
      store.dispatch(
        updateOrderStatus(
          "0xdbd851cc394595f9c50f32c1554059ec343471b49f84a4b72c44589a25f70ff3",
          CLOSE_DIALOG_CLOSING,
          "testMarketId",
          2,
          BUY
        )
      );
      expect(store.getActions()).toEqual([
        {
          type: "UPDATE_ORDER_STATUS",
          orderId:
            "0xdbd851cc394595f9c50f32c1554059ec343471b49f84a4b72c44589a25f70ff3",
          status: CLOSE_DIALOG_CLOSING,
          marketId: "testMarketId",
          orderType: BUY
        }
      ]);
    });
  });
});
