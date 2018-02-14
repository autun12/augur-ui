import React from "react";
// import ReactTooltip from 'react-tooltip'
// import { Line } from 'rc-progress'
import Bullet from "modules/common/components/bullet";
type UniverseProps = {
  className?: string,
  description?: string,
  id?: string,
  reportingPeriodDurationInSeconds?: number,
  reportingCycleTimeRemaining?: string,
  currentReportingPeriodPercentComplete?: number
};
const Universe: React.SFC<UniverseProps> = p => (
  <article className="universe-info">
    <span className="reporting-cycle-info">
      Reporting Period {p.currentReportingWindowAddress} <Bullet />{" "}
      {Math.round(p.currentReportingPeriodPercentComplete)}% complete <Bullet />{" "}
      period ends {p.reportingCycleTimeRemaining}
    </span>
    <span
      data-tip
      data-for="universe-id-tooltip"
      data-event="click focus"
      className="universe-description pointer"
    >
      {p.description} <Bullet /> {p.reportingPeriodDurationInSeconds / 3600}{" "}
      hours per period
    </span>
  </article>
);
export default Universe;
