import React, { Component } from "react";
import Styles from "modules/portfolio/components/transaction-meta/transaction-meta.styles";
type TransactionMetaProps = {
  meta: object,
  networkId: number
};
export default class TransactionMeta extends Component<
  TransactionMetaProps,
  {}
> {
  render() {
    const p = this.props;
    const baseLink = p.networkId
      ? TransactionMeta.networkLink[p.networkId]
      : null;
    return (
      <ul className={Styles.TransactionMeta}>
        {Object.keys(p.meta)
          .filter(metaTitle => metaTitle === "txhash")
          .map(metaTitle => (
            <li key={metaTitle}>
              <span>{metaTitle}</span>
              <span>
                {baseLink && (
                  <a href={baseLink + p.meta[metaTitle]} target="blank">
                    {p.meta[metaTitle]}
                  </a>
                )}
                {!baseLink && <span>{p.meta[metaTitle]}</span>}
              </span>
            </li>
          ))}
        {Object.keys(p.meta)
          .filter(metaTitle => metaTitle !== "txhash")
          .map(metaTitle => (
            <li key={metaTitle}>
              <span>{metaTitle}</span>
              <span>
                <span>{p.meta[metaTitle]}</span>
              </span>
            </li>
          ))}
      </ul>
    );
  }
}
