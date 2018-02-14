import React from "react";
import Styles from "modules/modal/components/modal-network-mismatch/modal-network-mismatch.styles";
type ModalNetworkMismatchProps = {
  expectedNetwork: number
};
const ModalNetworkMismatch: React.SFC<ModalNetworkMismatchProps> = p => (
  <section className={Styles.ModalNetworkMismatch}>
    <h1>Network Mismatch</h1>
    <span>
      The network set on the connected ethereum node does not match the contract
      network.
    </span>
    <span>Please set network to: {p.expectedNetwork}</span>
  </section>
);
export default ModalNetworkMismatch;
