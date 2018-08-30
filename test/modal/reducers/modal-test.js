import reducer from "modules/modal/reducers/modal";

import { UPDATE_MODAL } from "modules/modal/actions/update-modal";
import { CLOSE_MODAL } from "modules/modal/actions/close-modal";

describe("modules/modal/reducers/modal", () => {
  const test = t => test(t.description, () => t.assertions());

  test("should return the DEFAULT_STATE", () => {
    const actual = reducer(undefined, { type: null });

    const expected = {};

    assert.deepEqual(actual, expected, `didn't return the expected object`);
  });

  test("should return the passed value", () => {
    const actual = reducer({ test: "TEST" }, { type: null });

    const expected = {
      test: "TEST"
    };

    assert.deepEqual(actual, expected, `didn't return the expected object`);
  });

  test("should return the updated state when case is UPDATE_MODAL", () => {
    const actual = reducer(
      { test: "TEST" },
      { type: UPDATE_MODAL, data: { test: "NEW" } }
    );

    const expected = {
      test: "NEW"
    };

    assert.deepEqual(actual, expected, `didn't return the expected object`);
  });

  test(
    "should return the updated DEFAULT_STATE when case is CLOSE_MODAL",
    () => {
      const actual = reducer({ test: "TEST" }, { type: CLOSE_MODAL });

      const expected = {};

      assert.deepEqual(actual, expected, `didn't return the expected object`);
    }
  );
});
