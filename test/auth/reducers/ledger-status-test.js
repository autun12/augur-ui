import {
  NOT_CONNECTED,
  ATTEMPTING_CONNECTION
} from "modules/auth/constants/ledger-status";
import { updateLedgerStatus } from "modules/auth/actions/update-ledger-status";
import { resetState } from "modules/app/actions/reset-state";
import { clearLoginAccount } from "modules/auth/actions/update-login-account";
import reducer from "modules/auth/reducers/ledger-status";

describe(`modules/auth/reducers/ledger-status.js`, () => {
  const test = t => test(t.description, () => t.assertions());

  test("It should return the default state on unrecognized action", () => {
    assert.deepEqual(
      reducer(undefined, { type: "unrecognized" }),
      NOT_CONNECTED
    );
  });
  test("It should return the default state on reset-state action", () => {
    assert.deepEqual(
      reducer(ATTEMPTING_CONNECTION, resetState()),
      NOT_CONNECTED
    );
  });
  test(
    "It should return the default state on clear login account action",
    () => {
      assert.deepEqual(
        reducer(ATTEMPTING_CONNECTION, clearLoginAccount()),
        NOT_CONNECTED
      );
    }
  );
  test(
    "It should return the update the ledger status on UPDATE_LEDGER_STATUS action",
    () => {
      assert.deepEqual(
        reducer(NOT_CONNECTED, updateLedgerStatus(ATTEMPTING_CONNECTION)),
        ATTEMPTING_CONNECTION
      );
    }
  );
});
