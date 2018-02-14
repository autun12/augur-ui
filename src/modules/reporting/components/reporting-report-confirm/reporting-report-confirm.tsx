import React from "react";
import BigNumber from "bignumber.js";
import FormStyles from "modules/common/less/form";
import ConfirmStyles from "modules/common/less/confirm-table";
type ReportingReportConfirmProps = {
  market: object,
  selectedOutcome: string,
  stake: string,
  isMarketValid?: boolean
};
const ReportingReportConfirm: React.SFC<ReportingReportConfirmProps> = p => (
  <article className={FormStyles.Form__fields}>
    <div className={ConfirmStyles.Confirm}>
      <h2 className={ConfirmStyles.Confirm__heading}>Confirm Report</h2>
      <div className={ConfirmStyles["Confirm__wrapper--wide"]}>
        <div className={ConfirmStyles.Confirm__creation}>
          <ul className={ConfirmStyles["Confirm__list--left-align"]}>
            <li>
              <span>Market</span>
              <span>{p.isMarketValid ? "Valid" : "Invalid"}</span>
            </li>
            {p.isMarketValid && (
              <li>
                <span>Outcome</span>
                <span>{p.selectedOutcome}</span>
              </li>
            )}
            <li>
              <span>Stake</span>
              <span>
                {p.stake instanceof BigNumber ? p.stake.toNumber() : p.stake}{" "}
                REP
              </span>
            </li>
            <li>
              <span>Gas</span>
              <span>0.0023 ETH (2.8%)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </article>
);
export default ReportingReportConfirm;
