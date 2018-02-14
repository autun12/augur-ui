import React from "react";
import classNames from "classnames";
import Styles from "modules/common/components/caret-dropdown/caret-dropdown.styles";
type CaretDropdownProps = {
  className?: string,
  flipped?: boolean
};
const CaretDropdown: React.SFC<CaretDropdownProps> = p => (
  <svg
    className={classNames(Styles.CaretDropdown, p.className)}
    transform={p.flipped ? "rotate(180), translate(0, 4)" : ""}
  >
    <g
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g transform="translate(-1207.000000, -140.000000)" stroke="#A7A2B2">
        <g transform="translate(1206.000000, 134.000000)">
          <polyline
            transform="translate(8.156854, 6.156854) rotate(-225.000000) translate(-8.156854, -6.156854) "
            points="3.65685425 1.65685425 12.6568542 1.65685425 12.6568542 10.6568542"
          />
        </g>
      </g>
    </g>
  </svg>
);
export default CaretDropdown;
