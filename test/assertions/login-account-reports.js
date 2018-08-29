export default function(loginAccountReports) {
  describe(`loginAccountReports' shape`, () => {
    assert.isDefined(loginAccountReports);
    assert.isObject(loginAccountReports);

    test("reports", () => {
      assert.isDefined(loginAccountReports.reports);
      expect(Array.isArray(loginAccountReports.reports)).toBe(true);
    });

    test("summary", () => {
      assert.isDefined(loginAccountReports.summary);
      assert.isObject(loginAccountReports.summary);
    });
  });
}
