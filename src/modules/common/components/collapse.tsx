// Provides collapsible wrapper (default is div)
import React from "react";
import classNames from "classnames";
type CollapseProps = {
  isOpen?: boolean,
  component?: any
};
const Collapse: React.SFC<CollapseProps> = p => (
  <div className={classNames("collapse", { displayNone: !p.isOpen })}>
    {p.children}
  </div>
);
export default Collapse;
