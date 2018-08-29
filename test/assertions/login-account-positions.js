export default function(loginAccountPositions) {
  describe(`loginAccountPositions' shape`, () => {
    assert.isDefined(loginAccountPositions);
    assert.isObject(loginAccountPositions);

    test("markets", () => {
      assert.isDefined(loginAccountPositions.markets);
      expect(Array.isArray(loginAccountPositions.markets)).toBe(true);
    });

    test("summary", () => {
      assert.isDefined(loginAccountPositions.summary);
      assert.isObject(loginAccountPositions.summary);
    });
  });
}
