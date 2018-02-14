import React from "react";
import classNames from "classnames";
import Styles from "modules/app/components/inner-nav/inner-nav.styles";
type MenuItemProps = {
  isSelected?: boolean,
  key?: string
};
const MenuItem: React.SFC<MenuItemProps> = p => (
  <li
    className={classNames({
      [Styles["InnerNav__menu-item"]]: true,
      [Styles["InnerNav__menu-item--selected"]]: p.isSelected,
      [Styles["InnerNav__menu-item--visible"]]: p.visible
    })}
    key={p.key}
  >
    {p.children}
  </li>
);
export default MenuItem;
