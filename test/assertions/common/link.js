export default function(link, label = "Link") {
  describe(`${label} Shape`, () => {
    assert.isDefined(link);
    assert.isObject(link);

    test("href", () => {
      assert.isDefined(link.href);
      assert.isString(link.href);
    });

    test("onClick", () => {
      assert.isDefined(link.onClick);
      assert.isFunction(link.onClick);
    });
  });
}
