import React, { Component } from "react";
import classNames from "classnames";
import Dropdown from "modules/common/components/dropdown/dropdown";
import MarketPortfolioCard from "modules/market/components/market-portfolio-card/market-portfolio-card";
import NullStateMessage from "modules/common/components/null-state-message/null-state-message";
import Styles from "modules/portfolio/components/positions-markets-list/positions-markets-list.styles";
type PositionsMarketsListProps = {
  title: string,
  markets: any[],
  closePositionStatus: object,
  scalarShareDenomination: object,
  orderCancellation: object,
  location: object,
  history: object,
  linkType?: string,
  positionsDefault?: boolean,
  claimTradingProceeds?: (...args: any[]) => any,
  isMobile?: boolean
};
type PositionsMarketsListState = {
  sortType: any,
  filterType: any,
  sortType: string,
  defaultSortType: string,
  sortOptions: { label: string, value: string }[]
};
class PositionsMarketsList extends Component<
  PositionsMarketsListProps,
  PositionsMarketsListState
> {
  constructor(props) {
    super(props);
    // NOTE: didn't make this component a container because it is reused in 3 different ways, seemed easier to seperate markets in positions and pass market arrays and filter categories
    this.state = {
      sortType: "volume",
      defaultSortType: "volume",
      sortOptions: [
        { label: "Volume", value: "volume" },
        { label: "Newest", value: "newest" },
        { label: "Expiring Soon", value: "expiring" },
        { label: "Fees", value: "fees" }
      ]
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
      <div
        className={classNames(Styles.PositionsMarketsList, {
          [`${Styles.PositionMarketsListNullState}`]: p.markets.length === 0
        })}
      >
        <div className={Styles.PositionsMarketsList__SortBar}>
          <div className={Styles["PositionsMarketsList__SortBar-title"]}>
            {p.title}
          </div>
          <div className={Styles["PositionsMarketsList__SortBar-sort"]}>
            <Dropdown
              default={s.defaultSortType}
              options={s.sortOptions}
              onChange={this.changeDropdown}
            />
          </div>
        </div>
        {p.markets.length ? (
          p.markets.map(market => (
            <MarketPortfolioCard
              key={market.id}
              market={market}
              closePositionStatus={p.closePositionStatus}
              scalarShareDenomination={p.scalarShareDenomination}
              orderCancellation={p.orderCancellation}
              location={p.location}
              history={p.history}
              linkType={p.linkType}
              positionsDefault={p.positionsDefault}
              claimTradingProceeds={p.claimTradingProceeds}
              isMobile={p.isMobile}
            />
          ))
        ) : (
          <NullStateMessage message="No Markets Available" />
        )}
      </div>
    );
  }
}
export default PositionsMarketsList;
