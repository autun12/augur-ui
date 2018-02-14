import React from "react";
import classNames from "classnames";
type NavReportingIconProps = {
  className?: string
};
const NavReportingIcon: React.SFC<NavReportingIconProps> = p => (
  <svg
    viewBox="0 0 24 24"
    className={classNames("nav-reporting-icon", { [p.className]: p.className })}
  >
    <g
      id="Symbols"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g id="Icon/Reporting" stroke="#FFFFFF">
        <polyline
          id="Page-1"
          points="1 13.1237033 9.63049725 19.4302343 23 5"
        />
      </g>
    </g>
  </svg>
);
export default NavReportingIcon;
