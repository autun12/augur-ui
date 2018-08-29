import OrphanedOrdersReducer from "modules/orphaned-orders/reducers/orphaned-orders";
import {
  addOrphanedOrder,
  dismissOrphanedOrder,
  removeOrphanedOrder,
  cancelOrphanedOrder
} from "src/modules/orphaned-orders/actions";
import { RESET_STATE } from "src/modules/app/actions/reset-state";

// I'm back door testing action creators here.
describe("src/modules/orphaned-orders/reducers/orphaned-orders.js", () => {
  describe("default state", () => {
    test("should be an empty array", () => {
      const actual = OrphanedOrdersReducer([], {});

      expect(Array.isArray(actual)).toBe(true);
      expect(actual).toHaveLength(0);
    });
  });

  describe("ADD_ORPHANED_ORDER", () => {
    test("should push the data payload onto the state with an added dismissed property", () => {
      const action = addOrphanedOrder({ orderId: "12345" });
      const actual = OrphanedOrdersReducer([], action);
      expect(actual).toEqual([
        {
          dismissed: false,
          orderId: "12345"
        }
      ]);
    });

    test("should do nothing if an order exists with the same orderId", () => {
      // I'm back door testing action creators here.
      const action = addOrphanedOrder({ orderId: "12345", timestamp: 123456 });
      const actual = OrphanedOrdersReducer(
        [
          {
            dismissed: false,
            orderId: "12345",
            timestamp: 123456
          }
        ],
        action
      );

      expect(actual).toEqual([
        {
          dismissed: false,
          orderId: "12345",
          timestamp: 123456
        }
      ]);
    });
  });

  describe("DISMISS_ORPHANED_ORDER", () => {
    test("should set dismissed propert to true", () => {
      const actual = OrphanedOrdersReducer(
        [
          {
            dismissed: false,
            orderId: "54321",
            timestamp: 123456
          },
          {
            dismissed: false,
            orderId: "12345",
            timestamp: 123456
          }
        ],
        dismissOrphanedOrder({ orderId: "12345" })
      );

      expect(actual).toEqual([
        {
          dismissed: false,
          orderId: "54321",
          timestamp: 123456
        },
        {
          dismissed: true,
          orderId: "12345",
          timestamp: 123456
        }
      ]);
    });
  });

  describe("REMOVE_ORPHANED_ORDER", () => {
    test("should filter out anything with a matching orderId", () => {
      const action = removeOrphanedOrder("12345");
      const actual = OrphanedOrdersReducer(
        [
          {
            dismissed: false,
            orderId: "12345"
          }
        ],
        action
      );

      expect(actual).toEqual([]);
    });
  });

  describe("RESET_STATE", () => {
    test("should return to the default state", () => {
      const actual = OrphanedOrdersReducer(
        [
          {
            dismissed: false,
            orderId: "12345"
          }
        ],
        {
          type: RESET_STATE
        }
      );

      expect(actual).toEqual([]);
    });
  });

  describe("CANCEL_ORDER", () => {
    test("should return to the default state", () => {
      jest.mock("src/select-state");
      jest.mock("services/augurjs");

      cancelOrphanedOrder({ orderId: "12345" }, actual => {
        expect(actual).toEqual([]);
      });
    });
  });
});
