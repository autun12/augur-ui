import React from "react";
import Styles from "modules/market/components/market-outstanding-returns/market-outstanding-returns.styles";
type OutstandingReturnsProps = {
  id: string,
  unclaimedCreatorFees: object,
  collectMarketCreatorFees: (...args: any[]) => any
};
const OutstandingReturns: React.SFC<OutstandingReturnsProps> = p => (
  <div className={Styles.MarketOutstandingReturns}>
    Outstanding Returns {p.unclaimedCreatorFees.full}
    <div className={Styles.MarketOutstandingReturns__actions}>
      <button
        className={Styles.MarketOutstandingReturns__collect}
        onClick={() => {
          p.collectMarketCreatorFees(p.id);
        }}
      >
        Collect Returns
      </button>
    </div>
  </div>
);
export default OutstandingReturns;
