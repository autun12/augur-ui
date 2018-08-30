import {
  UPDATE_IS_MOBILE,
  updateIsMobile
} from "modules/app/actions/update-is-mobile";

describe("modules/app/actions/update-is-mobile.js", () => {
  test(`should return the expected string`, () => {
    const expected = "UPDATE_IS_MOBILE";

    expect(UPDATE_IS_MOBILE).toBe(expected);
  });

  describe(`updateIsMobile`, () => {
    test(`should return the expected object`, () => {
      const actual = updateIsMobile(false);

      const expected = {
        type: UPDATE_IS_MOBILE,
        data: {
          isMobile: false
        }
      };

      expect(actual).toEqual(expected);
    });
  });
});
