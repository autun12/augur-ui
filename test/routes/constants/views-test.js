import * as views from "modules/routes/constants/views";

describe("modules/app/constants/views", () => {
  const test = t => test(t.description, () => t.assertions());

  test({
    description: `should return the expected value 'DEFAULT_VIEW'`,
    assertions: () => {
      const expected = "categories";

      expect(views.DEFAULT_VIEW).toBe(expected);
    }
  });

  test({
    description: `should return the expected value 'M'`,
    assertions: () => {
      const expected = "market";

      expect(views.MARKET).toBe(expected);
    }
  });

  test({
    description: `should return the expected value 'MARKETS'`,
    assertions: () => {
      const expected = "markets";

      expect(views.MARKETS).toBe(expected);
    }
  });

  test({
    description: `should return the expected value 'CREATE_MARKET'`,
    assertions: () => {
      const expected = "create-market";

      expect(views.CREATE_MARKET).toBe(expected);
    }
  });

  test({
    description: `should return the expected value 'TRANSACTIONS'`,
    assertions: () => {
      const expected = "transactions";

      expect(views.TRANSACTIONS).toBe(expected);
    }
  });

  test({
    description: `should return the expected value 'ACCOUNT'`,
    assertions: () => {
      const expected = "account";

      expect(views.ACCOUNT).toBe(expected);
    }
  });

  test({
    description: `should return the expected value 'AUTHENTICATION'`,
    assertions: () => {
      const expected = "authentication";

      expect(views.AUTHENTICATION).toBe(expected);
    }
  });

  test({
    description: `should return the expected value 'CATEGORIES'`,
    assertions: () => {
      const expected = "categories";

      expect(views.CATEGORIES).toBe(expected);
    }
  });

  test({
    description: `should return the expected value 'AUTH_LOGIN'`,
    assertions: () => {
      const expected = "authentication";

      expect(views.AUTHENTICATION).toBe(expected);
    }
  });

  test({
    description: `should return the expected value 'MY_POSITIONS'`,
    assertions: () => {
      const expected = "my-positions";

      expect(views.MY_POSITIONS).toBe(expected);
    }
  });

  test({
    description: `should return the expected value 'MY_MARKETS'`,
    assertions: () => {
      const expected = "my-markets";

      expect(views.MY_MARKETS).toBe(expected);
    }
  });

  test({
    description: `should return the expected value 'REPORTING'`,
    assertions: () => {
      const expected = "reporting";

      expect(views.REPORTING).toBe(expected);
    }
  });

  test({
    description: `should return the expected value 'MARKET_DATA_NAV_OUTCOMES'`,
    assertions: () => {
      const expected = "outcomes";

      expect(views.MARKET_DATA_NAV_OUTCOMES).toBe(expected);
    }
  });

  test({
    description: `should return the expected value 'MARKET_DATA_ORDERS'`,
    assertions: () => {
      const expected = "orders";

      expect(views.MARKET_DATA_ORDERS).toBe(expected);
    }
  });

  test({
    description: `should return the expected value 'MARKET_DATA_NAV_CHARTS'`,
    assertions: () => {
      const expected = "charts";

      expect(views.MARKET_DATA_NAV_CHARTS).toBe(expected);
    }
  });

  test({
    description: `should return the expected value 'MARKET_DATA_NAV_DETAILS'`,
    assertions: () => {
      const expected = "details";

      expect(views.MARKET_DATA_NAV_DETAILS).toBe(expected);
    }
  });

  test({
    description: `should return the expected value 'MARKET_DATA_NAV_REPORT'`,
    assertions: () => {
      const expected = "report";

      expect(views.MARKET_DATA_NAV_REPORT).toBe(expected);
    }
  });

  test({
    description: `should return the expected value 'MARKET_DATA_NAV_SNITCH'`,
    assertions: () => {
      const expected = "snitch";

      expect(views.MARKET_DATA_NAV_SNITCH).toBe(expected);
    }
  });

  test({
    description: `should return the expected value 'MARKET_USER_DATA_NAV_POSITIONS'`,
    assertions: () => {
      const expected = "positions";

      expect(views.MARKET_USER_DATA_NAV_POSITIONS).toBe(expected);
    }
  });

  test({
    description: `should return the expected value 'MARKET_USER_DATA_NAV_OPEN_ORDERS'`,
    assertions: () => {
      const expected = "open-orders";

      expect(views.MARKET_USER_DATA_NAV_OPEN_ORDERS).toBe(expected);
    }
  });

  test({
    description: `should return the expected value 'ACCOUNT_DEPOSIT'`,
    assertions: () => {
      const expected = "deposit-funds";

      expect(views.ACCOUNT_DEPOSIT).toBe(expected);
    }
  });

  test({
    description: `should return the expected value 'ACCOUNT_TRANSFER'`,
    assertions: () => {
      const expected = "transfer-funds";

      expect(views.ACCOUNT_TRANSFER).toBe(expected);
    }
  });
});
