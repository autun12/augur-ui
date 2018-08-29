import assertNavItem from "assertions/common/nav-item";

export default function(portfolioNavItems) {
  describe(`portfolio's navItems state`, () => {
    assert.isDefined(portfolioNavItems);
    expect(Array.isArray(portfolioNavItems)).toBe(true);

    portfolioNavItems.forEach(navItem => {
      assertNavItem(navItem, "portfolio.navItem");
    });
  });
}
