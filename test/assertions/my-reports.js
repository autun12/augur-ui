import assertFormattedNumber from "assertions/common/formatted-number";
import assertFormattedDate from "assertions/common/formatted-date";

export default function(reports) {
  describe(`loginAccountReports.reports' shape`, () => {
    assert.isDefined(reports);
    expect(Array.isArray(reports)).toBe(true);

    reports.forEach(report => {
      assertAccountReport(report);
    });
  });
}

export function assertAccountReport(report) {
  describe(`report's shape`, () => {
    test("id", () => {
      assert.isDefined(report.id);
      assert.isString(report.id);
    });

    test("description", () => {
      assert.isDefined(report.description);
      assert.isString(report.description);
    });

    test("outcome", () => {
      assert.isDefined(report.outcome);

      report.outcome != null && assert.isString(report.outcome);
    });

    test("outcomePercentage", () => {
      assert.isDefined(report.outcomePercentage);

      assertFormattedNumber(report.outcomePercentage, "report.fees");
    });

    test("reported", () => {
      assert.isDefined(report.reported);
      assert.isString(report.reported);
    });

    test("isReportEqual", () => {
      assert.isDefined(report.isReportEqual);
      assert.isBoolean(report.isReportEqual);
    });

    test("feesEarned", () => {
      assert.isDefined(report.feesEarned);

      assertFormattedNumber(report.feesEarned, "report.feesEarned");
    });

    test("repEarned", () => {
      assert.isDefined(report.repEarned);

      assertFormattedNumber(report.repEarned, "report.repEarned");
    });

    test("endTime", () => {
      assert.isDefined(report.endTime);

      assertFormattedDate(report.endTime, "report.endTime");
    });

    test("isChallenged", () => {
      assert.isDefined(report.isChallenged);
      assert.isBoolean(report.isChallenged);
    });

    test("isChallangeable", () => {
      assert.isDefined(report.isChallengeable);
      assert.isBoolean(report.isChallengeable);
    });
  });
}
