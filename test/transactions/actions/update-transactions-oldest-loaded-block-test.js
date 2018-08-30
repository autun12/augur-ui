import * as updateTransactionsOldestLoadedBlock from "modules/transactions/actions/update-transactions-oldest-loaded-block";

describe("modules/transactions/actions/update-transactinos-oldest-loaded-block.js", () => {
  describe("updateTransactionsOldestLoadedBlock", () => {
    test(`should return the expected object`, () => {
      const actual = updateTransactionsOldestLoadedBlock.updateTransactionsOldestLoadedBlock(
        123
      );

      const expected = {
        type:
          updateTransactionsOldestLoadedBlock.UPDATE_TRANSACTIONS_OLDEST_LOADED_BLOCK,
        data: {
          block: 123
        }
      };

      expect(actual).toEqual(expected);
    });
  });
});
