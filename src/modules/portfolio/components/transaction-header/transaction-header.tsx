import React from "react";
import Styles from "modules/portfolio/components/transaction-header/transaction-header.styles";
type TransactionHeaderProps = {
  transaction: object
};
const TransactionHeader: React.SFC<TransactionHeaderProps> = ({
  transaction
}) => (
  <div>
    <h5 className={Styles.TransactionHeader__status}>{transaction.status}</h5>
    <h3 className={Styles.TransactionHeader__message}>{transaction.message}</h3>
    <h4 className={Styles.TransactionHeader__description}>
      {transaction.description}
    </h4>
    <h4 className={Styles.TransactionHeader__date}>
      {transaction.timestamp.full}
    </h4>
  </div>
);
export default TransactionHeader;
