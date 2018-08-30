describe(`utils/base-58.js`, () => {
  const base58 = jest.mock("../../src/utils/base-58.js", {});
  describe("base58Decode", () => {
    test("should match", () => {
      const decoded = base58.base58Decode(
        "kpXKnbi9Czht5bSPbpf7QoYiDWDF8UWZzmWiCrM7xoE4rbkZ7WmpM4dq9WLki1F8Qhg4bcBYtE8"
      );
      expect(decoded).toEqual({
        hello: "world",
        description: "this is a test object"
      });
    });
  });
  describe("base58Encode", () => {
    test("should match", () => {
      const example = {
        hello: "world",
        description: "this is a test object"
      };

      const encoded = base58.base58Encode(example);
      expect(encoded).toEqual(
        "kpXKnbi9Czht5bSPbpf7QoYiDWDF8UWZzmWiCrM7xoE4rbkZ7WmpM4dq9WLki1F8Qhg4bcBYtE8"
      );
    });
  });
});
