import assertLink from "../../test/assertions/common/link";

export default function(links) {
  describe("links state", () => {
    assert.isDefined(links, `links isn't defined`);
    assert.isObject(links, `links isn't an object`);

    test("authLink", () => {
      assertLink(links.authLink, "authLink");
    });

    test("marketsLink", () => {
      assertLink(links.marketsLink, "marketsLink");
    });

    test("transactionsLink", () => {
      assertLink(links.transactionsLink, "transactionsLink");
    });

    test("marketLink", () => {
      assertLink(links.marketLink, "marketLink");
    });

    test("previousLink", () => {
      assertLink(links.previousLink, "previousLink");
    });

    test("createMarketLink", () => {
      assertLink(links.createMarketLink, "createMarketLink");
    });

    test("categorysLink", () => {
      assertLink(links.categorysLink, "categorysLink");
    });
  });
}
