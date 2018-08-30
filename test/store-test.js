import store from "src/store";
/*
==================================
|      expectedInitialState      |
==================================

{
  blockchain: {},
  universe: {},
  auth: { selectedAuthType: 'register', err: null },
  loginAccount: {},
  activePage: 'categorys',
  marketsData: {},
  favorites: {},
  pendingReports: {},
  selectedMarketId: null,
  selectedMarketsHeader: null,
  tags: '',
  selectedFilters: { isOpen: true },
  selectedSort: { prop: 'volume', isDesc: true },
  tradesInProgress: {},
  outcomes: {},
  bidsAsks: {},
  accountTrades: {},
  transactionsData: {}
}
*/
describe(`store.js`, () => {
  const state = store.getState();

  test("should initialize with the correct default state", () => {
    assert.isOk(state, "state is not defined");
    expect(typeof state).toBe("object");

    assert.isOk(state.blockchain, "blockchain is not defined");
    expect(typeof state.blockchain).toBe("object");
    expect(state.blockchain).toEqual({});

    assert.isOk(state.universe, "universe is not defined");
    expect(typeof state.universe).toBe("object");
    expect(state.universe).toEqual({});

    assert.isOk(state.loginAccount, "loginAccount is not defined");
    expect(typeof state.loginAccount).toBe("object");
    expect(state.loginAccount).toEqual({});

    assert.isOk(state.marketsData, "marketsData is not defined");
    expect(typeof state.marketsData).toBe("object");
    expect(state.marketsData).toEqual({});

    assert.isOk(state.favorites, "favorites is not defined");
    expect(typeof state.favorites).toBe("object");
    expect(state.favorites).toEqual({});

    assert.isOk(state.notifications, "notifications is not defined");
    expect(Array.isArray(state.notifications)).toBe(true);
    expect(state.notifications).toEqual([]);

    assert.isOk(state.reports, "reports is not defined");
    expect(typeof state.reports).toBe("object");
    expect(state.reports).toEqual({});

    assert.isOk(state.tradesInProgress, "tradesInProgress is not defined");
    expect(typeof state.tradesInProgress).toBe("object");
    expect(state.tradesInProgress).toEqual({});

    assert.isOk(state.outcomesData, "outcomes is not defined");
    expect(typeof state.outcomesData).toBe("object");
    expect(state.outcomesData).toEqual({});

    assert.isOk(state.orderBooks, "orderBooks is not defined");
    expect(typeof state.orderBooks).toBe("object");
    expect(state.orderBooks).toEqual({});

    expect(state.accountTrades).toEqual({});

    assert.isOk(state.transactionsData, "transactionsData is not defined");
    expect(typeof state.transactionsData).toBe("object");
    expect(state.transactionsData).toEqual({});
  });
});
