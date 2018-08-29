import { ungroupBy } from "src/utils/ungroupBy";

describe("src/utils/ungroupBy.js", () => {
  describe("ungroupBy method", () => {
    // This is the omnibus example.
    test("should collapse trees into an array of flattish objects", () => {
      const obj = {
        v1: {
          v2: {
            v3: [
              {
                id: 1,
                anotherObj: {
                  prop: "yo"
                }
              },
              {
                id: 2
              }
            ]
          }
        }
      };

      expect(ungroupBy(obj, ["a", "b", "c"])).toEqual([
        {
          a: "v1",
          b: "v2",
          c: "v3",
          id: 1,
          anotherObj: {
            prop: "yo"
          }
        },
        {
          a: "v1",
          b: "v2",
          c: "v3",
          id: 2
        }
      ]);
    });
  });

  describe("terminal step", () => {
    let exampleObject;

    beforeEach(() => {
      exampleObject = {
        justSomeProperty: "justSomeProperty"
      };
    });

    test("should push the passed object onto results array", () => {
      const results = ungroupBy(exampleObject, []);
      expect(results).toEqual([
        {
          justSomeProperty: "justSomeProperty"
        }
      ]);
    });
  });

  describe("single depth", () => {
    test("should collapse the first key and push the result on the array", () => {
      const exampleObject = {
        v1: {
          v2: "justSomeProperty"
        }
      };
      const results = ungroupBy(exampleObject, ["key1"]);
      console.log(results);
      expect(results).toEqual([
        {
          key1: "v1",
          v2: "justSomeProperty"
        }
      ]);
    });
  });

  describe("split in tree", () => {
    test("should collapse both branches", () => {
      const exampleObject = {
        v1: {
          v2: "justSomeProperty"
        },
        v3: {
          v4: "justAnotherProperty"
        }
      };
      const results = ungroupBy(exampleObject, ["key1"]);
      expect(results).toEqual([
        {
          key1: "v1",
          v2: "justSomeProperty"
        },
        {
          key1: "v3",
          v4: "justAnotherProperty"
        }
      ]);
    });
  });

  describe("arrays", () => {
    test("should collapse as if it were not there", () => {
      const exampleObject = {
        v1: [
          {
            v2: "justSomeProperty"
          },
          {
            v3: "justAnotherProperty"
          }
        ]
      };
      const results = ungroupBy(exampleObject, ["key1"]);
      expect(results).toEqual([
        {
          key1: "v1",
          v2: "justSomeProperty"
        },
        {
          key1: "v1",
          v3: "justAnotherProperty"
        }
      ]);
    });
  });
});
