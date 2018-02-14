import React from "react";
import classNames from "classnames";
type ComponentNavProps = {
  fullWidth?: boolean,
  navItems: object,
  selectedNav: string,
  updateSelectedNav: (...args: any[]) => any
};
const ComponentNav: React.SFC<ComponentNavProps> = p => (
  <ul
    className={classNames("component-nav", { "full-width-nav": p.fullWidth })}
  >
    {Object.keys(p.navItems || {}).map(nav => (
      <button
        key={nav}
        className={classNames("unstyled", {
          selected: p.selectedNav === nav,
          "mobile-only": p.navItems[nav].isMobile
        })}
        onClick={() => {
          p.updateSelectedNav(nav);
        }}
      >
        <li className={classNames({ selected: p.selectedNav === nav })}>
          {p.navItems[nav].label}
        </li>
      </button>
    ))}
  </ul>
);
export default ComponentNav;
