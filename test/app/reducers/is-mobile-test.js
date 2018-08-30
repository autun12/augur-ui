import isMobileReducer from "modules/app/reducers/is-mobile";
import { UPDATE_IS_MOBILE } from "modules/app/actions/update-is-mobile";

describe("modules/app/reducers/is-mobile.js", () => {
  const test = t => it(t.description, () => t.assertions());

  it(`should return the default state`, () => {
    const actual = isMobileReducer(undefined, {});

    const expected = false;

    assert.strictEqual(actual, expected, `didn't return the expected value`);
  });

  it(`should return the updated state`, () => {
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
