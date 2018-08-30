import * as modalTypes from "modules/modal/constants/modal-types";

describe("modules/modal/constants/modal-types", () => {
  test(`should return the expected value 'MODAL_LEDGER'`, () => {
    const expected = "MODAL_LEDGER";

    expect(modalTypes.MODAL_LEDGER).toBe(expected);
  });
  test(`should return the expected value 'MODAL_UPORT'`, () => {
    const expected = "MODAL_UPORT";

    expect(modalTypes.MODAL_UPORT).toBe(expected);
  });
  test(`should return the expected value 'MODAL_NETWORK_MISMATCH'`, () => {
    const expected = "MODAL_NETWORK_MISMATCH";

    expect(modalTypes.MODAL_NETWORK_MISMATCH).toBe(expected);
  });
  test(`should return the expected value 'MODAL_NETWORK_DISCONNECTED'`, () => {
    const expected = "MODAL_NETWORK_DISCONNECTED";

    expect(modalTypes.MODAL_NETWORK_DISCONNECTED).toBe(expected);
  });
});
