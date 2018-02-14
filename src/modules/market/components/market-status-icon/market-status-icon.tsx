import React from "react";
import classNames from "classnames";
import {
  MarketStatusOpen,
  MarketStatusReported,
  MarketStatusClosed
} from "modules/common/components/icons/icons";
import Styles from "modules/market/components/market-status-icon/market-status-icon.styles";
type MarketStatusIconProps = {
  isOpen?: boolean,
  isReported?: boolean
};
const MarketStatusIcon: React.SFC<MarketStatusIconProps> = p => {
  let marketStatusIcon;
  switch (true) {
    case p.isOpen && p.isReported:
      marketStatusIcon = MarketStatusReported;
      break;
    case p.isOpen:
      marketStatusIcon = MarketStatusOpen;
      break;
    default:
      marketStatusIcon = MarketStatusClosed;
  }
  return (
    <span className={classNames(Styles.MarketStatusIcon, p.className)}>
      {marketStatusIcon}
    </span>
  );
};
export default MarketStatusIcon;
