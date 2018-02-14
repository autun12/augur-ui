import React from "react";
import classNames from "classnames";
type ValueTimestampProps = {
  className?: string,
  full?: string
};
const ValueTimestamp: React.SFC<ValueTimestampProps> = p => (
  <span className={classNames("value-timestamp", p.className)}>{p.full}</span>
);
export default ValueTimestamp;
