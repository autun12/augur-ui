import React from "react";
import Styles from "modules/market/components/market-outcome-charts--header/market-outcome-charts--header.styles";
type MarketOutcomeCandlestickHeaderProps = {
  fixedPrecision: number,
  volume?: number,
  open?: number,
  high?: number,
  low?: number,
  close?: number
};
const MarketOutcomeCandlestickHeader: React.SFC<
  MarketOutcomeCandlestickHeaderProps
> = p => (
  <section>
    <div className={Styles.MarketOutcomeChartsHeader__Header}>
      <h2>Placeholder Outcome</h2>
      <span>price (eth)</span>
    </div>
    <div className={Styles.MarketOutcomeChartsHeader__stats}>
      <span className={Styles.MarketOutcomeChartsHeader__stat}>
        <span className={Styles[`MarketOutcomeChartsHeader__stat-title`]}>
          volume
        </span>
        <span className={Styles[`MarketOutcomeChartsHeader__stat-value`]}>
          {p.volume ? (
            p.volume.toFixed(p.fixedPrecision).toString()
          ) : (
            <span>&mdash;</span>
          )}
        </span>
      </span>
      <span className={Styles.MarketOutcomeChartsHeader__stat}>
        <span className={Styles[`MarketOutcomeChartsHeader__stat-title`]}>
          open
        </span>
        <span className={Styles[`MarketOutcomeChartsHeader__stat-value`]}>
          {p.open ? (
            p.open.toFixed(p.fixedPrecision).toString()
          ) : (
            <span>&mdash;</span>
          )}
        </span>
      </span>
      <span className={Styles.MarketOutcomeChartsHeader__stat}>
        <span className={Styles[`MarketOutcomeChartsHeader__stat-title`]}>
          high
        </span>
        <span className={Styles[`MarketOutcomeChartsHeader__stat-value`]}>
          {p.high ? (
            p.high.toFixed(p.fixedPrecision).toString()
          ) : (
            <span>&mdash;</span>
          )}
        </span>
      </span>
      <span className={Styles.MarketOutcomeChartsHeader__stat}>
        <span className={Styles[`MarketOutcomeChartsHeader__stat-title`]}>
          low
        </span>
        <span className={Styles[`MarketOutcomeChartsHeader__stat-value`]}>
          {p.low ? (
            p.low.toFixed(p.fixedPrecision).toString()
          ) : (
            <span>&mdash;</span>
          )}
        </span>
      </span>
      <span className={Styles.MarketOutcomeChartsHeader__stat}>
        <span className={Styles[`MarketOutcomeChartsHeader__stat-title`]}>
          close
        </span>
        <span className={Styles[`MarketOutcomeChartsHeader__stat-value`]}>
          {p.close ? (
            p.close.toFixed(p.fixedPrecision).toString()
          ) : (
            <span>&mdash;</span>
          )}
        </span>
      </span>
    </div>
  </section>
);
export default MarketOutcomeCandlestickHeader;
