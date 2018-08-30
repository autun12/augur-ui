import isAugurJSVersionsEqual, {
  __RewireAPI__ as isAugurJSVersionsEqualAPI
} from "modules/auth/helpers/is-augurjs-versions-equal";

describe("modules/auth/helpers/is-augurjs-versions-equal", () => {
  const test = t => test(t.description, async () => t.assertions());

  afterEach(() => {
    isAugurJSVersionsEqualAPI.__ResetDependency__("augur");
  });

  test({
    description: `Should handle an error from augurNode.getSyncData, and return false`,
    assertions: () => {
      isAugurJSVersionsEqualAPI.__Rewire__("augur", {
        version: "helloWorld",
        augurNode: {
          getSyncData: cb => {
            cb({ error: 1000, message: "Uh-Oh!" });
          }
        }
      });

      return isAugurJSVersionsEqual().then(res => {
        expect(typeof res).toBe("object");
        expect(res.isEqual).toBeFalsy();
        assert.isUndefined(res.augurNode);
        expect(res.augurjs).toEqual("helloWorld");
      });
    }
  });

  test({
    description: `Should handle a versionMismatch and return false`,
    assertions: () => {
      isAugurJSVersionsEqualAPI.__Rewire__("augur", {
        version: "helloWorld",
        augurNode: {
          getSyncData: cb => {
            cb(undefined, { version: "goodbyeWorld" });
          }
        }
      });

      return isAugurJSVersionsEqual().then(res => {
        expect(typeof res).toBe("object");
        expect(res.isEqual).toBeFalsy();
        expect(res.augurNode).toEqual("goodbyeWorld");
        expect(res.augurjs).toEqual("helloWorld");
      });
    }
  });

  test({
    description: `Should handle a matching version and return true`,
    assertions: () => {
      isAugurJSVersionsEqualAPI.__Rewire__("augur", {
        version: "helloWorld",
        augurNode: {
          getSyncData: cb => {
            cb(undefined, { version: "helloWorld" });
          }
        }
      });
      return isAugurJSVersionsEqual().then(res => {
        expect(typeof res).toBe("object");
        expect(res.isEqual).toBeTruthy();
        expect(res.augurNode).toEqual("helloWorld");
        expect(res.augurjs).toEqual("helloWorld");
      });
    }
  });
});
