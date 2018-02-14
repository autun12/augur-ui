import React from "react";
import classNames from "classnames";
import { Notifications } from "modules/common/components/icons/icons";
import Styles from "modules/app/components/top-bar/top-bar.styles";
type TopBarProps = {
  isLogged: boolean,
  stats: any[],
  unseenCount: number,
  toggleNotifications: (...args: any[]) => any
};
const TopBar: React.SFC<TopBarProps> = props => (
  <header className={Styles.TopBar}>
    {props.isLogged && (
      <section>
        <div className={Styles.TopBar__stats}>
          <div className={Styles.TopBar__stat}>
            <span className={Styles["TopBar__stat-label"]}>ETH</span>
            <span className={Styles["TopBar__stat-value"]}>
              {props.stats[0].totalRealEth.value.formatted}
            </span>
          </div>
          <div className={Styles.TopBar__stat}>
            <span className={Styles["TopBar__stat-label"]}>REP</span>
            <span className={Styles["TopBar__stat-value"]}>
              {props.stats[0].totalRep.value.formatted}
            </span>
          </div>
        </div>
        <div
          className={classNames(
            Styles.TopBar__stats,
            Styles.TopBar__performance
          )}
        >
          <div className={Styles.TopBar__stat}>
            <div className={Styles["TopBar__stat-label"]}>
              <span>{props.stats[1].totalPLMonth.label}</span>
            </div>
            <span className={Styles["TopBar__stat-value"]}>
              {props.stats[1].totalPLMonth.value.formatted}
            </span>
          </div>
          <div className={Styles.TopBar__stat}>
            <div className={Styles["TopBar__stat-label"]}>
              <span>{props.stats[1].totalPLDay.label}</span>
            </div>
            <span className={Styles["TopBar__stat-value"]}>
              {props.stats[1].totalPLDay.value.formatted}
            </span>
          </div>
        </div>
        <div className={Styles.TopBar__notifications}>
          <button
            className={Styles["TopBar__notification-icon"]}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              props.toggleNotifications();
            }}
          >
            {Notifications(props.unseenCount)}
          </button>
        </div>
      </section>
    )}
    <span className={Styles["TopBar__logo-text"]}>Augur</span>
  </header>
);
export default TopBar;
