import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Dropdown from "modules/common/components/dropdown/dropdown";
import MarketsList from "modules/markets/components/markets-list";
import Styles from "modules/portfolio/components/watchlist/watchlist.styles";
import { TYPE_TRADE } from "modules/market/constants/link-types";
type WatchListProps = {
  markets: any[],
  filteredMarkets: any[],
  isLogged: boolean,
  hasAllTransactionsLoaded: boolean,
  history: object,
  location: object,
  match: object,
  scalarShareDenomination: object,
  toggleFavorite: (...args: any[]) => any,
  loadMarketsInfo: (...args: any[]) => any,
  isMobile?: boolean
};
type WatchListState = {
  sortType: any,
  filterType: any,
  sortOptions: { label: string, value: string }[],
  sortDefault: string,
  sortType: string,
  filterOptions: { label: string, value: string }[],
  filterDefault: string,
  filterType: string
};
class WatchList extends Component<WatchListProps, WatchListState> {
  constructor(props) {
    super(props);
    this.state = {
      sortOptions: [
        { label: "Volume", value: "volume" },
        { label: "Newest", value: "newest" },
        { label: "Fees", value: "fees" },
        { label: "Expiring Soon", value: "expiring" }
      ],
      sortDefault: "volume",
      sortType: "volume",
      filterOptions: [
        { label: "Cryptocurrency", value: "cryptocurrency" },
        { label: "Blockchain", value: "blockchain" },
        { label: "Bitcoin", value: "bitcoin" },
        { label: "Ethereum", value: "ethereum" }
      ],
      filterDefault: "cryptocurrency",
      filterType: "cryptocurrency"
    };
    this.changeDropdown = this.changeDropdown.bind(this);
  }
  changeDropdown(value) {
    let { sortType } = this.state;
    let { filterType } = this.state;
    this.state.sortOptions.forEach((type, ind) => {
      if (type.value === value) {
        sortType = value;
      }
    });
    this.state.filterOptions.forEach((type, ind) => {
      if (type.value === value) {
        filterType = value;
      }
    });
    this.setState({ sortType, filterType });
  }
  render() {
    const p = this.props;
    const s = this.state;
    return (
      <section className={Styles.WatchList}>
        <Helmet>
          <title>Watching</title>
        </Helmet>
        <div className={Styles.WatchList__SortBar}>
          <div className={Styles["WatchList__SortBar-title"]}>Watching</div>
          <div className={Styles["WatchList__SortBar-sort"]}>
            <Dropdown
              default={s.sortDefault}
              options={s.sortOptions}
              onChange={this.changeDropdown}
            />
          </div>
          <div className={Styles["WatchList__SortBar-filter"]}>
            <Dropdown
              default={s.filterDefault}
              options={s.filterOptions}
              onChange={this.changeDropdown}
            />
          </div>
        </div>
        <MarketsList
          isLogged={p.isLogged}
          markets={p.markets}
          filteredMarkets={p.filteredMarkets}
          location={p.location}
          history={p.history}
          scalarShareDenomination={p.scalarShareDenomination}
          toggleFavorite={p.toggleFavorite}
          loadMarketsInfo={p.loadMarketsInfo}
          linkType={TYPE_TRADE}
          isMobile={p.isMobile}
        />
      </section>
    );
  }
}
export default WatchList;
