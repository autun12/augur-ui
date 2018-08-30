import * as updateTransactionsLoading from "modules/transactions/actions/update-transactions-loading";

describe("modules/transactions/actions/update-transactinos-loading.js", () => {
  describe("updateTransactionsLoading", () => {
    test(`should return the expected object`, () => {
      const actual = updateTransactionsLoading.updateTransactionsLoading(
        "testing"
      );

      const expected = {
        type: updateTransactionsLoading.UPDATE_TRANSACTIONS_LOADING,
        data: {
          isLoading: "testing"
        }
      };

      expect(actual).toEqual(expected);
    });
  });
});
