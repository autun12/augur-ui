export default function(portfolioSummaries) {
  describe(`portfolio's summaries shape`, () => {
    assert.isDefined(portfolioSummaries);
    expect(Array.isArray(portfolioSummaries)).toBe(true);

    portfolioSummaries.forEach(summary => {
      assertSummary(summary);
    });
  });
}

function assertSummary(summary) {
  describe(`summary's shape`, () => {
    test("label", () => {
      assert.isDefined(summary.label);
      assert.isString(summary.label);
    });

    test("value", () => {
      assert.isDefined(summary.value);
      assert.isString(summary.value);
    });
  });
}
