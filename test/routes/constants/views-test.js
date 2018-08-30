import * as views from "modules/routes/constants/views";

describe("modules/app/constants/views", () => {
  test(`should return the expected value 'DEFAULT_VIEW'`, () => {
    const expected = "categories";

    expect(views.DEFAULT_VIEW).toBe(expected);
  });

  test(`should return the expected value 'M'`, () => {
    const expected = "market";

    expect(views.MARKET).toBe(expected);
  });

  test(`should return the expected value 'MARKETS'`, () => {
    const expected = "markets";

    expect(views.MARKETS).toBe(expected);
  });

  test(`should return the expected value 'CREATE_MARKET'`, () => {
    const expected = "create-market";

    expect(views.CREATE_MARKET).toBe(expected);
  });

  test(`should return the expected value 'TRANSACTIONS'`, () => {
    const expected = "transactions";

    expect(views.TRANSACTIONS).toBe(expected);
  });

  test(`should return the expected value 'ACCOUNT'`, () => {
    const expected = "account";

    expect(views.ACCOUNT).toBe(expected);
  });

  test(`should return the expected value 'AUTHENTICATION'`, () => {
    const expected = "authentication";

    expect(views.AUTHENTICATION).toBe(expected);
  });

  test(`should return the expected value 'CATEGORIES'`, () => {
    const expected = "categories";

    expect(views.CATEGORIES).toBe(expected);
  });

  test(`should return the expected value 'AUTH_LOGIN'`, () => {
    const expected = "authentication";

    expect(views.AUTHENTICATION).toBe(expected);
  });

  test(`should return the expected value 'MY_POSITIONS'`, () => {
    const expected = "my-positions";

    expect(views.MY_POSITIONS).toBe(expected);
  });

  test(`should return the expected value 'MY_MARKETS'`, () => {
    const expected = "my-markets";

    expect(views.MY_MARKETS).toBe(expected);
  });

  test(`should return the expected value 'REPORTING'`, () => {
    const expected = "reporting";

    expect(views.REPORTING).toBe(expected);
  });

  test(`should return the expected value 'MARKET_DATA_NAV_OUTCOMES'`, () => {
    const expected = "outcomes";

    expect(views.MARKET_DATA_NAV_OUTCOMES).toBe(expected);
  });

  test(`should return the expected value 'MARKET_DATA_ORDERS'`, () => {
    const expected = "orders";

    expect(views.MARKET_DATA_ORDERS).toBe(expected);
  });

  test(`should return the expected value 'MARKET_DATA_NAV_CHARTS'`, () => {
    const expected = "charts";

    expect(views.MARKET_DATA_NAV_CHARTS).toBe(expected);
  });

  test(`should return the expected value 'MARKET_DATA_NAV_DETAILS'`, () => {
    const expected = "details";

    expect(views.MARKET_DATA_NAV_DETAILS).toBe(expected);
  });

  test(`should return the expected value 'MARKET_DATA_NAV_REPORT'`, () => {
    const expected = "report";

    expect(views.MARKET_DATA_NAV_REPORT).toBe(expected);
  });

  test(`should return the expected value 'MARKET_DATA_NAV_SNITCH'`, () => {
    const expected = "snitch";

    expect(views.MARKET_DATA_NAV_SNITCH).toBe(expected);
  });

  test(`should return the expected value 'MARKET_USER_DATA_NAV_POSITIONS'`, () => {
    const expected = "positions";

    expect(views.MARKET_USER_DATA_NAV_POSITIONS).toBe(expected);
  });

  test(`should return the expected value 'MARKET_USER_DATA_NAV_OPEN_ORDERS'`, () => {
    const expected = "open-orders";

    expect(views.MARKET_USER_DATA_NAV_OPEN_ORDERS).toBe(expected);
  });

  test(`should return the expected value 'ACCOUNT_DEPOSIT'`, () => {
    const expected = "deposit-funds";

    expect(views.ACCOUNT_DEPOSIT).toBe(expected);
  });

  test(`should return the expected value 'ACCOUNT_TRANSFER'`, () => {
    const expected = "transfer-funds";

    expect(views.ACCOUNT_TRANSFER).toBe(expected);
  });
});
