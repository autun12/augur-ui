import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import makePath from "modules/routes/helpers/make-path";
import PositionsMarketsList from "modules/portfolio/components/positions-markets-list/positions-markets-list";
import {
  TYPE_CHALLENGE,
  TYPE_CLAIM_PROCEEDS
} from "modules/market/constants/link-types";
import PortfolioStyles from "modules/portfolio/components/portfolio-view/portfolio-view.styles";
import { MARKETS } from "modules/routes/constants/views";
type PositionsProps = {
  location: object,
  history: object,
  openPositionMarkets: any[],
  reportingMarkets: any[],
  closedMarkets: any[],
  closePositionStatus: object,
  scalarShareDenomination: object,
  orderCancellation: object,
  loadAccountTrades: (...args: any[]) => any,
  marketsCount: number,
  registerBlockNumber?: number,
  claimTradingProceeds: (...args: any[]) => any,
  isMobile?: boolean
};
export default class Positions extends Component<PositionsProps, {}> {
  componentWillMount() {
    this.props.loadAccountTrades();
  }
  render() {
    const p = this.props;
    return (
      <section>
        <Helmet>
          <title>Positions</title>
        </Helmet>
        {p.marketsCount !== 0 && (
          <div>
            <PositionsMarketsList
              title="Open"
              markets={p.openPositionMarkets}
              closePositionStatus={p.closePositionStatus}
              scalarShareDenomination={p.scalarShareDenomination}
              orderCancellation={p.orderCancellation}
              location={p.location}
              history={p.history}
              isMobile={p.isMobile}
            />
            <PositionsMarketsList
              title="In Reporting"
              markets={p.reportingMarkets}
              closePositionStatus={p.closePositionStatus}
              scalarShareDenomination={p.scalarShareDenomination}
              orderCancellation={p.orderCancellation}
              location={p.location}
              history={p.history}
              linkType={TYPE_CHALLENGE}
              positionsDefault={false}
              isMobile={p.isMobile}
            />
            <PositionsMarketsList
              title="Finalized"
              markets={p.closedMarkets}
              closePositionStatus={p.closePositionStatus}
              scalarShareDenomination={p.scalarShareDenomination}
              orderCancellation={p.orderCancellation}
              location={p.location}
              history={p.history}
              positionsDefault={false}
              linkType={TYPE_CLAIM_PROCEEDS}
              claimTradingProceeds={p.claimTradingProceeds}
              isMobile={p.isMobile}
            />
          </div>
        )}
        {p.marketsCount === 0 && (
          <div className={PortfolioStyles.NoMarkets__container}>
            <span>You don&apos;t have any positions.</span>
            <Link
              className={PortfolioStyles.NoMarkets__link}
              to={makePath(MARKETS)}
            >
              <span>Click here to view markets.</span>
            </Link>
          </div>
        )}
      </section>
    );
  }
}
