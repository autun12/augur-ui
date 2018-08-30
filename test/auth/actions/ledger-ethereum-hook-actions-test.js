import * as LEDGER_STATES from "modules/auth/constants/ledger-status";
import { UPDATE_LEDGER_STATUS } from "modules/auth/actions/update-ledger-status";
import { MODAL_LEDGER } from "modules/modal/constants/modal-types";
import { UPDATE_MODAL } from "modules/modal/actions/update-modal";
import {
  onConnectLedgerRequest,
  onOpenEthereumAppRequest,
  onSwitchLedgerModeRequest,
  onEnableContractSupportRequest
} from "modules/auth/actions/ledger-ethereum-hook-actions";
import mocks from "test/mockStore";

describe("modules/auth/actions/ledger-ethereum-hook-actions.js", () => {
  const test = t => test(t.description, () => t.assertions());
  const { store } = mocks;

  afterEach(() => {
    store.clearActions();
  });

  test("should handle a onConnectLedgerRequest action", () => {
    store.dispatch(onConnectLedgerRequest());
    const expected = [
      {
        type: UPDATE_LEDGER_STATUS,
        data: LEDGER_STATES.CONNECT_LEDGER
      }
    ];
    assert.deepEqual(store.getActions(), expected);
  });
  test("should handle a onOpenEthereumAppRequest action", () => {
    store.dispatch(onOpenEthereumAppRequest());
    const expected = [
      {
        type: UPDATE_LEDGER_STATUS,
        data: LEDGER_STATES.OPEN_APP
      }
    ];
    assert.deepEqual(store.getActions(), expected);
  });
  test("should handle a onSwitchLedgerModeRequest action", () => {
    store.dispatch(onSwitchLedgerModeRequest());
    const expected = [
      {
        type: UPDATE_LEDGER_STATUS,
        data: LEDGER_STATES.SWITCH_MODE
      }
    ];
    assert.deepEqual(store.getActions(), expected);
  });
  test("should handle a onEnableContractSupportRequest action", () => {
    store.dispatch(onEnableContractSupportRequest());
    const expected = [
      {
        type: UPDATE_LEDGER_STATUS,
        data: LEDGER_STATES.ENABLE_CONTRACT_SUPPORT
      },
      {
        type: UPDATE_MODAL,
        data: {
          type: MODAL_LEDGER,
          error: "Please enable Contract Data on your Ledger to use Augur.",
          canClose: true
        }
      }
    ];
    assert.deepEqual(store.getActions(), expected);
  });
});
