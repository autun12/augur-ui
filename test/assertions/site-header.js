import assertActivePage from "./active-view";
import assertPositionsSummary from "./positions-summary";
import assertTransactionsTotals from "./transactions-totals";
import assertIsTransactionsWorking from "./is-transactions-working";

export default function(siteHeader) {
  expect(siteHeader).toBeDefined();
  expect(typeof siteHeader).toBe("object");
  assertActivePage(siteHeader.activePage);
  assertPositionsSummary(siteHeader.positionsSummary);
  assertTransactionsTotals(siteHeader.transactionsTotals);
  assertIsTransactionsWorking(siteHeader.isTransactionsWorking);
}
