describe(`utils/base-58.js`, () => {
  const base58 = jest.mock("../../src/utils/base-58.js", {});
  describe("base58Decode", () => {
    const test = t =>
      test(JSON.stringify(t), () => {
        const decoded = base58.base58Decode(t.encoded);
        t.assertions(decoded);
      });
    test({
      encoded:
        "kpXKnbi9Czht5bSPbpf7QoYiDWDF8UWZzmWiCrM7xoE4rbkZ7WmpM4dq9WLki1F8Qhg4bcBYtE8",
      assertions: decoded => {
        expect(decoded).toEqual({
          hello: "world",
          description: "this is a test object"
        });
      }
    });
  });
  describe("base58Encode", () => {
    const test = t =>
      test(JSON.stringify(t), () => {
        const encoded = base58.base58Encode(t.object);
        t.assertions(encoded);
      });
    test({
      object: {
        hello: "world",
        description: "this is a test object"
      },
      assertions: encoded => {
        expect(encoded).toEqual(
          "kpXKnbi9Czht5bSPbpf7QoYiDWDF8UWZzmWiCrM7xoE4rbkZ7WmpM4dq9WLki1F8Qhg4bcBYtE8"
        );
      }
    });
  });
});
