import React, { Component } from "react";
import MarketHeader from "modules/market/containers/market-header";
// import MarketOutcomesChart from 'modules/market/containers/market-outcomes-chart'
import MarketOutcomeCharts from "modules/market/containers/market-outcome-charts";
import MarketOutcomesAndPositions from "modules/market/containers/market-outcomes-and-positions";
import MarketTrading from "modules/market/containers/market-trading";
import Styles from "modules/market/components/market-view/market-view.styles";
console.log("marketOutcome -- ", MarketOutcomeCharts);
type MarketViewProps = {
  marketId: string,
  isConnected: boolean,
  isMarketLoaded: boolean,
  loadFullMarket: (...args: any[]) => any
};
type MarketViewState = {
  selectedOutcomes: any[],
  selectedOutcomes: undefined[],
  selectedOutcomes: undefined[]
};
export default class MarketView extends Component<
  MarketViewProps,
  MarketViewState
> {
  constructor(props) {
    super(props);
    this.state = {
      selectedOutcomes: []
    };
    this.updateSelectedOutcomes = this.updateSelectedOutcomes.bind(this);
    this.clearSelectedOutcomes = this.clearSelectedOutcomes.bind(this);
  }
  componentWillMount() {
    if (this.props.isConnected && !this.props.isMarketLoaded) {
      this.props.loadFullMarket();
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if (
      this.props.isConnected === false &&
      nextProps.isConnected === true &&
      !!nextProps.marketId
    ) {
      nextProps.loadFullMarket();
    }
  }
  updateSelectedOutcomes(selectedOutcome) {
    const newSelectedOutcomes = [...this.state.selectedOutcomes];
    const selectedOutcomeIndex = newSelectedOutcomes.indexOf(selectedOutcome);
    if (selectedOutcomeIndex !== -1) {
      newSelectedOutcomes.splice(selectedOutcomeIndex, 1);
    } else {
      newSelectedOutcomes.push(selectedOutcome);
    }
    this.setState({ selectedOutcomes: newSelectedOutcomes });
  }
  clearSelectedOutcomes() {
    this.setState({ selectedOutcomes: [] });
  }
  render() {
    const p = this.props;
    const s = this.state;
    return (
      <section>
        <div className={Styles.Market__upper}>
          <MarketHeader
            marketId={p.marketId}
            selectedOutcomes={s.selectedOutcomes}
            updateSelectedOutcomes={this.updateSelectedOutcomes}
            clearSelectedOutcomes={this.clearSelectedOutcomes}
          />
        </div>
        <section className={Styles.Market__details}>
          <div className={Styles["Market__details-outcomes"]}>
            <MarketOutcomesAndPositions
              marketId={p.marketId}
              selectedOutcomes={s.selectedOutcomes}
              updateSelectedOutcomes={this.updateSelectedOutcomes}
            />
          </div>
          <div className={Styles["Market__details-trading"]}>
            <MarketTrading
              marketId={p.marketId}
              selectedOutcomes={s.selectedOutcomes}
            />
          </div>
        </section>
      </section>
    );
  }
}
