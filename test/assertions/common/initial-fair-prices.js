export default function(initialFairPrices, refObj) {
  describe(`${refObj}'s initiaiFairPrices`, () => {
    describe("type", () => {
      test("should exist", () => {
        assert.isDefined(
          initialFairPrices.type,
          "initialFairPrices.type is not defined"
        );
      });

      test("should be a string", () => {
        assert.isString(
          initialFairPrices.type,
          "initialFairPrices.type is not a string"
        );
      });
    });

    describe("values", () => {
      test("should exist", () => {
        assert.isDefined(
          initialFairPrices.values,
          "initialFairPrices.values is not defined"
        );
      });

      test("should be an array", () => {
        assert.isArray(
          initialFairPrices.values,
          "initialFairPrices.values is not an array"
        );
      });
    });

    describe("raw", () => {
      test("should exist", () => {
        assert.isDefined(
          initialFairPrices.raw,
          "initialFairPrices.raw is not defined"
        );
      });

      test("should be an array", () => {
        assert.isArray(
          initialFairPrices.raw,
          "initialFairPrices.raw is not an array"
        );
      });
    });
  });
}
