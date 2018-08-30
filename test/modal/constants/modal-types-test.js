import * as modalTypes from "modules/modal/constants/modal-types";

describe("modules/modal/constants/modal-types", () => {
  const test = t => test(t.description, () => t.assertions());

  test({
    description: `should return the expected value 'MODAL_LEDGER'`,
    assertions: () => {
      const expected = "MODAL_LEDGER";

      expect(modalTypes.MODAL_LEDGER).toBe(expected);
    }
  });
  test({
    description: `should return the expected value 'MODAL_UPORT'`,
    assertions: () => {
      const expected = "MODAL_UPORT";

      expect(modalTypes.MODAL_UPORT).toBe(expected);
    }
  });
  test({
    description: `should return the expected value 'MODAL_NETWORK_MISMATCH'`,
    assertions: () => {
      const expected = "MODAL_NETWORK_MISMATCH";

      expect(modalTypes.MODAL_NETWORK_MISMATCH).toBe(expected);
    }
  });
  test({
    description: `should return the expected value 'MODAL_NETWORK_DISCONNECTED'`,
    assertions: () => {
      const expected = "MODAL_NETWORK_DISCONNECTED";

      expect(modalTypes.MODAL_NETWORK_DISCONNECTED).toBe(expected);
    }
  });
});
