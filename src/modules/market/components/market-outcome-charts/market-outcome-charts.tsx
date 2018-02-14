import React, { Component } from "react";
import MarketOutcomeChartsHeader from "modules/market/components/market-outcome-charts--header/market-outcome-charts--header";
import MarketOutcomeCandlestick from "modules/market/components/market-outcome-charts--candlestick/market-outcome-charts--candlestick";
import MarketOutcomeDepth from "modules/market/components/market-outcome-charts--depth/market-outcome-charts--depth";
import MarketOutcomeOrderBook from "modules/market/components/market-outcome-charts--orders/market-outcome-charts--orders";
import Styles from "modules/market/components/market-outcome-charts/market-outcome-charts.styles";
import { isEqual } from "lodash";
type MarketOutcomeChartsProps = {
  marketPriceHistory: any[],
  marketMin: number,
  marketMax: number,
  orderBookMin: number,
  orderBookMid: number,
  orderBookMax: number,
  orderBook: object,
  marketDepth: object,
  selectedOutcomes: any[]
};
type MarketOutcomeChartsState = {
  hoveredPeriod: any,
  hoveredDepth: any,
  fullPrice: any,
  hoveredPeriod: {},
  hoveredDepth: undefined[],
  hoveredPrice: null,
  fullPrice: null,
  fixedPrecision: number
};
export default class MarketOutcomeCharts extends Component<
  MarketOutcomeChartsProps,
  MarketOutcomeChartsState
> {
  constructor(props) {
    super(props);
    this.state = {
      hoveredPeriod: {},
      hoveredDepth: [],
      hoveredPrice: null,
      fullPrice: null,
      fixedPrecision: 4
    };
    this.updateHoveredPeriod = this.updateHoveredPeriod.bind(this);
    this.updateHoveredPrice = this.updateHoveredPrice.bind(this);
    this.updatePrecision = this.updatePrecision.bind(this);
    this.updateHoveredDepth = this.updateHoveredDepth.bind(this);
  }
  componentWillUpdate(nextProps, nextState) {
    if (
      !isEqual(this.state.fixedPrecision, nextState.fixedPrecision) ||
      !isEqual(this.state.fullPrice, nextState.fullPrice)
    ) {
      if (nextState.fullPrice === null) {
        this.updateHoveredPrice(null);
      } else {
        this.updateHoveredPrice(
          nextState.fullPrice.toFixed(nextState.fixedPrecision).toString()
        );
      }
    }
  }
  updateHoveredPeriod(hoveredPeriod) {
    this.setState({
      hoveredPeriod
    });
  }
  updateHoveredDepth(hoveredDepth) {
    this.setState({
      hoveredDepth
    });
  }
  updateHoveredPrice(hoveredPrice) {
    this.setState({
      fullPrice: hoveredPrice
    });
  }
  updatePrecision(isIncreasing) {
    // TODO -- make this accomdate scale changes as well (microETH, nanoETH, K, M, B, etc.)
    let { fixedPrecision } = this.state;
    if (isIncreasing) {
      fixedPrecision += 1;
    } else {
      fixedPrecision = fixedPrecision - 1 < 0 ? 0 : (fixedPrecision -= 1);
    }
    return this.setState({ fixedPrecision });
  }
  render() {
    const s = this.state;
    const p = this.props;
    // TODO -- wire up marketMin + marketMax
    return (
      <section className={Styles.MarketOutcomeCharts}>
        <MarketOutcomeChartsHeader
          selectedOutcome={p.selectedOutcome}
          hoveredPeriod={s.hoveredPeriod}
          hoveredDepth={s.hoveredDepth}
          fixedPrecision={s.fixedPrecision}
          updatePrecision={this.updatePrecision}
        />
        <div className={Styles.MarketOutcomeCharts__Charts}>
          <div className={Styles.MarketOutcomeCharts__Candlestick}>
            <MarketOutcomeCandlestick
              marketPriceHistory={p.marketPriceHistory}
              fixedPrecision={s.fixedPrecision}
              outcomeMin={p.marketMin}
              orderBookMid={p.orderBookMid}
              outcomeMax={p.marketMax}
              marketMax={1}
              marketMin={0}
              hoveredPrice={s.hoveredPrice}
              updateHoveredPrice={this.updateHoveredPrice}
              updateHoveredPeriod={this.updateHoveredPeriod}
            />
          </div>
          <div className={Styles.MarketOutcomeCharts__Depth}>
            <MarketOutcomeDepth
              fixedPrecision={s.fixedPrecision}
              orderBookMin={p.orderBookMin}
              orderBookMid={p.orderBookMid}
              orderBookMax={p.orderBookMax}
              marketDepth={p.marketDepth}
              hoveredPrice={s.hoveredPrice}
              updateHoveredPrice={this.updateHoveredPrice}
              updateHoveredDepth={this.updateHoveredDepth}
            />
          </div>
          <div className={Styles.MarketOutcomeCharts__Orders}>
            <MarketOutcomeOrderBook
              fixedPrecision={s.fixedPrecision}
              orderBook={p.orderBook}
              hoveredPrice={s.hoveredPrice}
              updateHoveredPrice={this.updateHoveredPrice}
            />
          </div>
        </div>
      </section>
    );
  }
}
