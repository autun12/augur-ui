import React, { Component } from "react";
import { Helmet } from "react-helmet";
import ReportingHeader from "modules/reporting/containers/reporting-header";
const Styles = require("./reporting-dispute.styles");
type ReportingDisputeProps = {
  location: object,
  history: object,
  markets: any[],
  marketsCount: number,
  isMobile?: boolean
};
export default class ReportingDispute extends Component<
  ReportingDisputeProps,
  {}
> {
  componentWillMount() {}
  render() {
    return (
      <section className={Styles.ReportDispute}>
        <Helmet>
          <title>Dispute</title>
        </Helmet>
        <ReportingHeader heading="Dispute" showReportingEndDate />
      </section>
    );
  }
}
