import React, { Component } from "react";
import classNames from "classnames";
import Helmet from "react-helmet";
import Styles from "modules/auth/components/airbitz-connect/airbitz-connect.styles";
type AirbitzProps = {
  history: object,
  airbitzLoginLink: (...args: any[]) => any,
  airbitzOnLoad: (...args: any[]) => any
};
export default class Airbitz extends Component<AirbitzProps, {}> {
  componentWillMount() {
    this.props.airbitzOnLoad(this.props.history);
  }
  render() {
    const p = this.props;
    return (
      <section className={Styles.Airbitz}>
        <Helmet>
          <title>Airbitz</title>
        </Helmet>
        <button
          className={classNames(
            Styles.button,
            Styles[`button--purple`],
            Styles.Airbitz__button
          )}
          onClick={() => p.airbitzLoginLink(p.history)}
        >
          Connect Airbitz Account
        </button>
      </section>
    );
  }
}
