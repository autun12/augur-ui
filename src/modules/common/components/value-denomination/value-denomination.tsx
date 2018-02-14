import React from "react";
// import ReactTooltip from 'react-tooltip'
import Styles from "modules/common/components/value-denomination/value-denomination.styles";
type ValueDenominationProps = {
  className?: string,
  value?: number,
  formattedValue?: number,
  formatted?: string,
  fullPrecision?: string,
  denomination?: string,
  hidePrefix?: boolean,
  hidePostfix?: boolean,
  prefix?: string,
  postfix?: string,
  hideDenomination?: boolean
};
const ValueDenomination: React.SFC<ValueDenominationProps> = p => (
  <span className={Styles[p.className]}>
    {p.prefix &&
      !p.hidePrefix && (
        <span className={Styles.ValueDenomination__prefix}>{p.prefix}</span>
      )}
    {p.formatted &&
      p.fullPrecision && (
        <span data-tip={p.fullPrecision} data-event="click focus">
          {p.formatted}
        </span>
      )}
    {p.formatted && !p.fullPrecision && <span>{p.formatted}</span>}
    {p.denomination &&
      !p.hideDenomination && (
        <span className={Styles.ValueDenomination__denomination}>
          {p.denomination}
        </span>
      )}
    {p.postfix &&
      !p.hidePostfix && (
        <span className={Styles.ValueDenomimntion__postfix}>{p.postfix}</span>
      )}
    {!p.value &&
    p.value !== 0 &&
    !p.formatted &&
    p.formatted !== "0" && <span>&mdash;</span> // null/undefined state handler
    }
  </span>
);
export default ValueDenomination;
