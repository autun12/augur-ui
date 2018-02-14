import React from "react";
import classNames from "classnames";
import MarketBasics from "modules/market/components/market-basics/market-basics";
import MarketProperties from "modules/market/components/market-properties/market-properties";
import OutstandingReturns from "modules/market/components/market-outstanding-returns/market-outstanding-returns";
import CommonStyles from "modules/market/components/common/market-common.styles";
import Styles from "modules/market/components/market-preview/market-preview.styles";
type MarketPreviewProps = {
  isLogged: boolean,
  toggleFavorite?: (...args: any[]) => any,
  className?: string,
  description?: string,
  outcomes?: any[],
  isOpen?: boolean,
  isFavorite?: boolean,
  isPendingReport?: boolean,
  endDate?: object,
  settlementFeePercent?: object,
  volume?: object,
  tags?: any[],
  onClickToggleFavorite?: (...args: any[]) => any,
  cardStyle?: string,
  linkType?: string,
  outstandingReturns?: boolean,
  collectMarketCreatorFees?: (...args: any[]) => any
};
const MarketPreview: React.SFC<MarketPreviewProps> = p => (
  <article
    className={classNames(CommonStyles.MarketCommon__container, {
      [`${CommonStyles["single-card"]}`]: p.cardStyle === "single-card"
    })}
  >
    <MarketBasics {...p} />
    <div
      className={classNames(Styles.MarketPreview__footer, {
        [`${Styles["single-card"]}`]: p.cardStyle === "single-card"
      })}
    >
      <MarketProperties {...p} />
    </div>
    {p.outstandingReturns &&
      p.unclaimedCreatorFees.value > 0 && (
        <div
          className={classNames(Styles.MarketPreview__footer, {
            [`${Styles["single-card"]}`]: p.cardStyle === "single-card"
          })}
        >
          <OutstandingReturns
            id={p.id}
            unclaimedCreatorFees={p.unclaimedCreatorFees}
            collectMarketCreatorFees={p.collectMarketCreatorFees}
          />
        </div>
      )}
  </article>
);
export default MarketPreview;
