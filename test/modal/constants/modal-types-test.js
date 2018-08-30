import * as modalTypes from "modules/modal/constants/modal-types";

describe("modules/modal/constants/modal-types", () => {
  const test = t => test(t.description, () => t.assertions());

  test(`should return the expected value 'MODAL_LEDGER'`, () => {
    const expected = "MODAL_LEDGER";

    assert.strictEqual(
      modalTypes.MODAL_LEDGER,
      expected,
      `didn't return the expected string`
    );
  });
  test(`should return the expected value 'MODAL_UPORT'`, () => {
    const expected = "MODAL_UPORT";

    assert.strictEqual(
      modalTypes.MODAL_UPORT,
      expected,
      `didn't return the expected string`
    );
  });
  test(`should return the expected value 'MODAL_NETWORK_MISMATCH'`, () => {
    const expected = "MODAL_NETWORK_MISMATCH";

    assert.strictEqual(
      modalTypes.MODAL_NETWORK_MISMATCH,
      expected,
      `didn't return the expected string`
    );
  });
  test(`should return the expected value 'MODAL_NETWORK_DISCONNECTED'`, () => {
    const expected = "MODAL_NETWORK_DISCONNECTED";

    assert.strictEqual(
      modalTypes.MODAL_NETWORK_DISCONNECTED,
      expected,
      `didn't return the expected string`
    );
  });
});
