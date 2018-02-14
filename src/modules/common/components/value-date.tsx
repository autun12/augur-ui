import React from "react";
import classNames from "classnames";
type ValueDateProps = {
  className?: string,
  value?: object,
  formatted?: string
};
const ValueDate: React.SFC<ValueDateProps> = p => (
  <span className={classNames("value-date", p.className)}>{p.formatted}</span>
);
export default ValueDate;
