import isAugurJSVersionsEqual, {
  __RewireAPI__ as isAugurJSVersionsEqualAPI
} from "modules/auth/helpers/is-augurjs-versions-equal";

describe("modules/auth/helpers/is-augurjs-versions-equal", () => {
  const test = t => it(t.description, async () => t.assertions());

  afterEach(() => {
    isAugurJSVersionsEqualAPI.__ResetDependency__("augur");
  });

  it(`Should handle an error from augurNode.getSyncData, and return false`, () => {
    isAugurJSVersionsEqualAPI.__Rewire__("augur", {
      version: "helloWorld",
      augurNode: {
        getSyncData: cb => {
          cb({ error: 1000, message: "Uh-Oh!" });
        }
      }
    });

    return isAugurJSVersionsEqual().then(res => {
      assert.isObject(res);
      assert.isFalse(res.isEqual);
      assert.isUndefined(res.augurNode);
      assert.deepEqual(res.augurjs, "helloWorld");
    });
  });

  it(`Should handle a versionMismatch and return false`, () => {
    isAugurJSVersionsEqualAPI.__Rewire__("augur", {
      version: "helloWorld",
      augurNode: {
        getSyncData: cb => {
          cb(undefined, { version: "goodbyeWorld" });
        }
      }
    });

    return isAugurJSVersionsEqual().then(res => {
      assert.isObject(res);
      assert.isFalse(res.isEqual);
      assert.deepEqual(res.augurNode, "goodbyeWorld");
      assert.deepEqual(res.augurjs, "helloWorld");
    });
  });

  it(`Should handle a matching version and return true`, () => {
    isAugurJSVersionsEqualAPI.__Rewire__("augur", {
      version: "helloWorld",
      augurNode: {
        getSyncData: cb => {
          cb(undefined, { version: "helloWorld" });
        }
      }
    });
    return isAugurJSVersionsEqual().then(res => {
      assert.isObject(res);
      assert.isTrue(res.isEqual);
      assert.deepEqual(res.augurNode, "helloWorld");
      assert.deepEqual(res.augurjs, "helloWorld");
    });
  });
});
