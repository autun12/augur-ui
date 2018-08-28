import assertLink from "assertions/common/link";

export default function(navItem, label = "Nav Item") {
  describe(`${label}' Shape`, () => {
    assert.isDefined(navItem);
    assert.isObject(navItem);

    test("label", () => {
      assert.isDefined(navItem.label);
      assert.isString(navItem.label);
    });

    test("link", () => {
      assertLink(navItem.link, "portfolio.navItem.link");
    });

    test("page", () => {
      assert.isDefined(navItem.page);
      assert.isString(navItem.page);
    });
  });
}
