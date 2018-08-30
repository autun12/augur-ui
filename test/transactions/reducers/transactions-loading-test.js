import transactionsLoading from "modules/transactions/reducers/transactions-loading";

import { UPDATE_TRANSACTIONS_LOADING } from "modules/transactions/actions/update-transactions-loading";

describe("modules/transactions/reducers/transactions-loading", () => {
  test(`should return the default state`, () => {
    const actual = transactionsLoading(undefined, {});

    const expected = false;

    expect(actual).toBe(expected);
  });

  test(`should return the expected value for case UPDATE_TRANSACTIONS_LOADING`, () => {
    const actual = transactionsLoading(false, {
      type: UPDATE_TRANSACTIONS_LOADING,
      data: {
        isLoading: true
      }
    });

    const expected = true;

    expect(actual).toBe(expected);
  });
});
