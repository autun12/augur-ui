import { CLOSE_MODAL, closeModal } from "modules/modal/actions/close-modal";

describe("modules/modal/actions/close-modal", () => {
  const test = t => it(t.description, () => t.assertions());

  it("should return the expected value", () => {
    const actual = closeModal();

    const expected = {
      type: CLOSE_MODAL
    };

    assert(actual, expected, `didn't return the expected object`);
  });
});
