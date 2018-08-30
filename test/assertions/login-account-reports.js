export default function(loginAccountReports) {
  describe(`loginAccountReports' shape`, () => {
    assert.isDefined(loginAccountReports);
    assert.isObject(loginAccountReports);

    test("reports", () => {
      assert.isDefined(loginAccountReports.reports);
      assert.isArray(loginAccountReports.reports);
    });

    test("summary", () => {
      assert.isDefined(loginAccountReports.summary);
      assert.isObject(loginAccountReports.summary);
    });
  });
}
