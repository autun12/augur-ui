import React from "react";
import MarketOutcomeChartsHeaderCandlestick from "modules/market/components/market-outcome-charts--header-candlestick/market-outcome-charts--header-candlestick";
import MarketOutcomeChartHeaderDepth from "modules/market/components/market-outcome-charts--header-depth/market-outcome-charts--header-depth";
import MarketOutcomeChartHeaderOrders from "modules/market/components/market-outcome-charts--header-orders/market-outcome-charts--header-orders";
import Styles from "modules/market/components/market-outcome-charts--header/market-outcome-charts--header.styles";
type MarketOutcomeChartsHeaderProps = {
  hoveredPeriod: object,
  hoveredDepth: any[],
  fixedPrecision: number,
  updatePrecision: (...args: any[]) => any
};
const MarketOutcomeChartsHeader: React.SFC<
  MarketOutcomeChartsHeaderProps
> = p => (
  <section className={Styles.MarketOutcomeChartsHeader}>
    <div className={Styles.MarketOutcomeChartsHeader__Candlestick}>
      <MarketOutcomeChartsHeaderCandlestick
        volume={p.hoveredPeriod.volume}
        open={p.hoveredPeriod.open}
        high={p.hoveredPeriod.high}
        low={p.hoveredPeriod.low}
        close={p.hoveredPeriod.close}
        fixedPrecision={p.fixedPrecision}
      />
    </div>
    <div className={Styles.MarketOutcomeChartsHeader__Depth}>
      <MarketOutcomeChartHeaderDepth
        fixedPrecision={p.fixedPrecision}
        hoveredDepth={p.hoveredDepth}
      />
    </div>
    <div className={Styles.MarketOutcomeChartsHeader__Orders}>
      <MarketOutcomeChartHeaderOrders
        fixedPrecision={p.fixedPrecision}
        updatePrecision={p.updatePrecision}
      />
    </div>
  </section>
);
export default MarketOutcomeChartsHeader;
