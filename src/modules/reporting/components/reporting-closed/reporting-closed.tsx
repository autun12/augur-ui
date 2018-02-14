import React, { Component } from "react";
import { Helmet } from "react-helmet";
import MarketsList from "modules/markets/components/markets-list";
import { TYPE_CLOSED } from "modules/market/constants/link-types";
import Styles from "modules/reporting/components/reporting-closed/reporting-closed.styles";
type ReportingClosedProps = {
  markets: any[],
  history: object,
  location: object,
  scalarShareDenomination: object,
  toggleFavorite: (...args: any[]) => any,
  loadMarketsInfo: (...args: any[]) => any,
  isLogged: boolean,
  isMobile?: boolean
};
type ReportingClosedState = {
  filteredMarketsClosed: number[]
};
export default class ReportingClosed extends Component<
  ReportingClosedProps,
  ReportingClosedState
> {
  constructor(props) {
    super(props);
    this.state = {
      filteredMarketsClosed: [0, 1]
    };
  }
  render() {
    const s = this.state;
    const p = this.props;
    return (
      <section>
        <Helmet>
          <title>Reporting: Closed</title>
        </Helmet>
        <h1 className={Styles.ReportingClosed__heading}>Reporting: Closed</h1>
        <MarketsList
          isLogged={p.isLogged}
          markets={p.markets}
          filteredMarkets={s.filteredMarketsClosed}
          location={p.location}
          history={p.history}
          scalarShareDenomination={p.scalarShareDenomination}
          toggleFavorite={p.toggleFavorite}
          loadMarketsInfo={p.loadMarketsInfo}
          linkType={TYPE_CLOSED}
          paginationPageParam="reporting-closed-page"
          isMobile={p.isMobile}
        />
      </section>
    );
  }
}
