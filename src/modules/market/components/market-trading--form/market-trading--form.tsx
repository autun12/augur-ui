/* eslint jsx-a11y/label-has-for: 0 */
import React, { Component } from "react";
import classNames from "classnames";
import BigNumber from "bignumber.js";
import { MARKET, LIMIT } from "modules/transactions/constants/types";
import { SCALAR } from "modules/markets/constants/market-types";
import Styles from "modules/market/components/market-trading--form/market-trading--form.styles";
type MarketTradingFormProps = {
  market: object,
  marketType: string,
  selectedNav: string,
  orderType: string,
  orderPrice: string | object,
  orderQuantity: string | object,
  orderEstimate: string,
  selectedOutcome: object,
  nextPage: (...args: any[]) => any,
  updateState: (...args: any[]) => any,
  isMobile: boolean,
  minPrice: number,
  maxPrice: number,
  availableFunds?: any
};
type MarketTradingFormState = {
  [x: number]: any,
  errors: any,
  [x: number]: string,
  errors: { [x: number]: undefined[] },
  isOrderValid: boolean
};
class MarketTradingForm extends Component<
  MarketTradingFormProps,
  MarketTradingFormState
> {
  constructor(props) {
    super(props);
    this.INPUT_TYPES = {
      QUANTITY: "QUANTITY",
      PRICE: "PRICE",
      MARKET_ORDER_SIZE: "MARKET_ORDER_SIZE"
    };
    this.state = {
      [this.INPUT_TYPES.QUANTITY]: "",
      [this.INPUT_TYPES.PRICE]: "",
      [this.INPUT_TYPES.MARKET_ORDER_SIZE]: "",
      errors: {
        [this.INPUT_TYPES.QUANTITY]: [],
        [this.INPUT_TYPES.PRICE]: [],
        [this.INPUT_TYPES.MARKET_ORDER_SIZE]: []
      },
      isOrderValid: true
    };
  }
  validateForm(property, rawValue) {
    let value = rawValue;
    if (!(value instanceof BigNumber) && value !== "")
      value = new BigNumber(value);
    const errors = {};
    // TODO --
    // Update trade summary if valid
    if (property === this.INPUT_TYPES.PRICE) {
      errors[this.INPUT_TYPES.PRICE] = [];
      if (
        rawValue !== "" &&
        (value.lt(this.props.minPrice) || value.gt(this.props.maxPrice))
      ) {
        errors[this.INPUT_TYPES.PRICE].push(
          `Price must be between ${this.props.minPrice} - ${
            this.props.maxPrice
          }`
        );
      }
    }
    if (property === this.INPUT_TYPES.QUANTITY) {
      errors[this.INPUT_TYPES.QUANTITY] = [];
      if (rawValue !== "" && value.lt(0)) {
        errors[this.INPUT_TYPES.QUANTITY].push(
          "Quantity must be greater than 0"
        );
      }
    }
    if (property === this.INPUT_TYPES.MARKET_ORDER_SIZE) {
      errors[this.INPUT_TYPES.MARKET_ORDER_SIZE] = [];
      if (rawValue !== "") {
        if (value.gt(this.props.availableFunds)) {
          errors[this.INPUT_TYPES.MARKET_ORDER_SIZE].push(
            `Cannot exceed account ETH balance of ${this.props.availableFunds.toNumber()}`
          );
        }
        if (value.lt(0)) {
          errors[this.INPUT_TYPES.MARKET_ORDER_SIZE].push(
            `Cannot be a negative number`
          );
        }
      }
    }
    this.setState({
      errors: {
        ...this.state.errors,
        ...errors
      },
      [property]: value
    });
  }
  render() {
    const p = this.props;
    const s = this.state;
    const tickSize = parseFloat(p.market.tickSize);
    const errors = Array.from(
      new Set([
        ...s.errors[this.INPUT_TYPES.QUANTITY],
        ...s.errors[this.INPUT_TYPES.PRICE],
        ...s.errors[this.INPUT_TYPES.MARKET_ORDER_SIZE]
      ])
    );
    return (
      <ul className={Styles["TradingForm__form-body"]}>
        <li>
          <label>Order Type</label>
          <div className={Styles.TradingForm__type}>
            <button
              className={classNames({
                [`${Styles.active}`]: p.orderType === MARKET
              })}
              onClick={() => p.updateState("orderType", MARKET)}
            >
              Market
            </button>
            <button
              className={classNames({
                [`${Styles.active}`]: p.orderType === LIMIT
              })}
              onClick={() => p.updateState("orderType", LIMIT)}
            >
              Limit
            </button>
          </div>
        </li>
        {p.orderType === LIMIT &&
          !p.isMobile &&
          p.market.marketType !== SCALAR && (
            <li>
              <label>Outcome</label>
              <div className={Styles["TradingForm__static-field"]}>
                {p.selectedOutcome.name}
              </div>
            </li>
          )}
        {p.orderType === MARKET && (
          <li>
            <label htmlFor="tr__input--total-cost">Total Cost</label>
            <input
              className={classNames({
                [`${Styles.error}`]: s.errors[
                  this.INPUT_TYPES.MARKET_ORDER_SIZE
                ].length
              })}
              id="tr__input--total-cost"
              type="number"
              step={tickSize}
              placeholder={`${tickSize} ETH`}
              value={
                s[this.INPUT_TYPES.MARKET_ORDER_SIZE] instanceof BigNumber
                  ? s[this.INPUT_TYPES.MARKET_ORDER_SIZE].toNumber()
                  : s[this.INPUT_TYPES.MARKET_ORDER_SIZE]
              }
              onChange={e =>
                this.validateForm(
                  this.INPUT_TYPES.MARKET_ORDER_SIZE,
                  e.target.value
                )
              }
            />
          </li>
        )}
        {p.orderType === LIMIT && (
          <li>
            <label htmlFor="tr__input--quantity">Quantity</label>
            <input
              className={classNames({
                [`${Styles.error}`]: s.errors[this.INPUT_TYPES.QUANTITY].length
              })}
              id="tr__input--quantity"
              type="number"
              step={tickSize}
              placeholder={`${tickSize} Shares`}
              value={
                s[this.INPUT_TYPES.QUANTITY] instanceof BigNumber
                  ? s[this.INPUT_TYPES.QUANTITY].toNumber()
                  : s[this.INPUT_TYPES.QUANTITY]
              }
              onChange={e =>
                this.validateForm(this.INPUT_TYPES.QUANTITY, e.target.value)
              }
            />
          </li>
        )}
        {p.orderType === LIMIT && (
          <li>
            <label htmlFor="tr__input--limit-price">Limit Price</label>
            <input
              className={classNames({
                [`${Styles.error}`]: s.errors[this.INPUT_TYPES.PRICE].length
              })}
              id="tr__input--limit-price"
              type="number"
              step={tickSize}
              placeholder={`${tickSize} ETH`}
              value={
                s[this.INPUT_TYPES.PRICE] instanceof BigNumber
                  ? s[this.INPUT_TYPES.PRICE].toNumber()
                  : s[this.INPUT_TYPES.PRICE]
              }
              onChange={e =>
                this.validateForm(this.INPUT_TYPES.PRICE, e.target.value)
              }
            />
          </li>
        )}
        {p.orderType === LIMIT && (
          <li>
            <label>Est. Cost</label>
            <div className={Styles["TradingForm__static-field"]}>
              {p.orderEstimate}
            </div>
          </li>
        )}
        {p.orderType === MARKET && (
          <li>
            <label>Quantity</label>
            <div className={Styles["TradingForm__static-field"]}>
              {p.marketQuantity}
            </div>
          </li>
        )}
        {errors.length > 0 && (
          <li className={Styles["TradingForm__error-message"]}>
            {errors.map(error => <p key={error}>{error}</p>)}
          </li>
        )}
        <li className={Styles["TradingForm__button--review"]}>
          <button
            disabled={!s.isOrderValid}
            onClick={p.isOrderValid && p.nextPage}
          >
            Review
          </button>
        </li>
      </ul>
    );
  }
}
export default MarketTradingForm;
