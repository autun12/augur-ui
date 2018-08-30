import isMobileReducer from "modules/app/reducers/is-mobile";
import { UPDATE_IS_MOBILE } from "modules/app/actions/update-is-mobile";

describe("modules/app/reducers/is-mobile.js", () => {
  const test = t => test(t.description, () => t.assertions());

  test(`should return the default state`, () => {
    const actual = isMobileReducer(undefined, {});

    const expected = false;

    assert.strictEqual(actual, expected, `didn't return the expected value`);
  });

  test(`should return the updated state`, () => {
    const actual = isMobileReducer(undefined, {
      type: UPDATE_IS_MOBILE,
      data: {
        isMobile: false
      }
    });

    const expected = false;

    assert.strictEqual(actual, expected, `didn't return the expected value`);
  });
});
