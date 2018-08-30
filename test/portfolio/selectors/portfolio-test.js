import portfolioAssertions from "assertions/portfolio";

import sinon from "sinon";

describe("modules/portfolio/selectors/portfolio", () => {
  let actual;

  const selectors = {
    selectPortfolioNavItems: () => {},
    selectPortfolioTotals: () => {}
  };

  const stubbedPortfolioTotals = sinon.stub(selectors, "selectPortfolioTotals");

  const proxiedSelector = jest.mock(
    "../../../src/modules/portfolio/selectors/portfolio",
    {
      "./portfolio-totals": stubbedPortfolioTotals
    }
  );

  beforeAll(() => {
    actual = proxiedSelector.default();
  });

  test(`should call 'selectPortfolioTotals' once`, () => {
    assert(
      stubbedPortfolioTotals.calledOnce,
      `Didn't call 'selectPortfolioTotals' once as expected`
    );
  });

  test(`should return the correct object to augur-ui-react-components`, () => {
    portfolioAssertions(actual);
  });
});
