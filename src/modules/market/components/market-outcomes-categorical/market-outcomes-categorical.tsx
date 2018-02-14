import React, { Component } from "react";
import classNames from "classnames";
import getValue from "utils/get-value";
import Styles from "modules/market/components/market-outcomes-categorical/market-outcomes-categorical.styles";
type CategoricalOutcomeProps = {
  outcome: object,
  className?: string
};
const CategoricalOutcome: React.SFC<CategoricalOutcomeProps> = ({
  className,
  outcome
}) => (
  <div className={className || Styles.MarketOutcomesCategorical__outcome}>
    <span className={Styles["MarketOutcomesCategorical__outcome-name"]}>
      {outcome.name}
    </span>
    <span className={Styles["MarketOutcomesCategorical__outcome-value"]}>
      {getValue(outcome, "lastPricePercent.full")}
    </span>
  </div>
);
type MarketOutcomesCategoricalProps = {
  outcomes: any[]
};
type MarketOutcomesCategoricalState = {
  outcomeWrapperHeight: string | number,
  isOpen: boolean,
  outcomeWrapperHeight: number,
  isOpen: boolean
};
class MarketOutcomesCategorical extends Component<
  MarketOutcomesCategoricalProps,
  MarketOutcomesCategoricalState
> {
  constructor(props) {
    super(props);
    this.state = {
      outcomeWrapperHeight: 0,
      isOpen: false
    };
    this.showMore = this.showMore.bind(this);
  }
  showMore() {
    const outcomeWrapperHeight = this.state.isOpen
      ? 0
      : `${this.outcomeTable.clientHeight}px`;
    this.setState({
      outcomeWrapperHeight,
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const { outcomes } = this.props;
    const totalOutcomes = outcomes.length;
    const displayShowMore = totalOutcomes > 3;
    const showMoreText = this.state.isOpen
      ? `- ${totalOutcomes - 3} less`
      : `+ ${totalOutcomes - 3} more`;
    const outcomeWrapperStyle = {
      minHeight: this.state.outcomeWrapperHeight
    };
    return (
      <div
        className={Styles.MarketOutcomesCategorical}
        style={outcomeWrapperStyle}
      >
        {outcomes.length > 0 && (
          <CategoricalOutcome
            className={Styles["MarketOutcomesCategorical__height-sentinel"]}
            outcome={outcomes[0]}
          />
        )}
        <div
          className={classNames(
            Styles["MarketOutcomesCategorical__outcomes-container"],
            {
              [`${Styles["show-more"]}`]: displayShowMore
            }
          )}
        >
          {displayShowMore && (
            <button
              className={Styles["MarketOutcomesCategorical__show-more"]}
              onClick={this.showMore}
            >
              {showMoreText}
            </button>
          )}
          <div
            ref={outcomeTable => {
              this.outcomeTable = outcomeTable;
            }}
            className={Styles.MarketOutcomesCategorical__outcomes}
          >
            {outcomes.length > 0 &&
              outcomes.map(outcome => (
                <CategoricalOutcome key={outcome.id} outcome={outcome} />
              ))}
          </div>
        </div>
      </div>
    );
  }
}
export default MarketOutcomesCategorical;
