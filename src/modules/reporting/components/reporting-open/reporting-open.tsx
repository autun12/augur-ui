import React, { Component } from "react";
import { Helmet } from "react-helmet";
import ReportingHeader from "modules/reporting/containers/reporting-header";
import MarketsList from "modules/markets/components/markets-list";
import { TYPE_REPORT } from "modules/market/constants/link-types";
import Styles from "modules/reporting/components/reporting-open/reporting-open.styles";
type ReportingOpenProps = {
  markets: any[],
  history: object,
  location: object,
  scalarShareDenomination: object,
  toggleFavorite: (...args: any[]) => any,
  loadMarketsInfo: (...args: any[]) => any,
  isLogged: boolean,
  isMobile: boolean
};
type ReportingOpenState = {
  filteredMarketsReporting: number[],
  filteredMarketsDispute: number[]
};
export default class ReportingOpen extends Component<
  ReportingOpenProps,
  ReportingOpenState
> {
  constructor(props) {
    super(props);
    this.state = {
      filteredMarketsReporting: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      filteredMarketsDispute: [0, 1]
    };
  }
  render() {
    const s = this.state;
    const p = this.props;
    return (
      <section>
        <Helmet>
          <title>Reporting</title>
        </Helmet>
        <ReportingHeader heading="Reporting" showReportingEndDate />
        {s.filteredMarketsDispute.length && (
          <h2 className={Styles.ReportingOpen__heading}>In Dispute</h2>
        )}
        {s.filteredMarketsDispute.length && (
          <MarketsList
            isLogged={p.isLogged}
            markets={p.markets}
            filteredMarkets={s.filteredMarketsDispute}
            location={p.location}
            history={p.history}
            scalarShareDenomination={p.scalarShareDenomination}
            toggleFavorite={p.toggleFavorite}
            loadMarketsInfo={p.loadMarketsInfo}
            linkType={TYPE_REPORT}
            showPagination={false}
          />
        )}
        <h2 className={Styles.ReportingOpen__heading}>In Reporting</h2>
        <MarketsList
          isLogged={p.isLogged}
          markets={p.markets}
          filteredMarkets={s.filteredMarketsReporting}
          location={p.location}
          history={p.history}
          scalarShareDenomination={p.scalarShareDenomination}
          toggleFavorite={p.toggleFavorite}
          loadMarketsInfo={p.loadMarketsInfo}
          linkType={TYPE_REPORT}
          paginationPageParam="reporting-closed-page"
        />
      </section>
    );
  }
}
