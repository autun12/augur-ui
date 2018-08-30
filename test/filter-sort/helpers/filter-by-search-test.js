import mocks from "test/mockStore";
import { filterBySearch } from "modules/filter-sort/helpers/filter-by-search";

describe("modules/filter-sort/helpers/filter-by-search.js", () => {
  const test = t => test(t.description, () => t.assertions());
  const { state } = mocks;
  const defaultKeys = ["description", ["outcomes", "description"], ["tags"]];
  const defaultItems = [
    {
      ...state.marketsData.testMarketId,
      outcomes: [{ id: "1", description: "outcome1" }],
      tags: ["test"]
    },
    {
      ...state.marketsData.testMarketId2
    }
  ];
  test("should handle a null search", () => {
    assert.isNull(filterBySearch(null, [])([]));
  });
  test("should handle a empty string search", () => {
    assert.isNull(filterBySearch("", [])([]));
  });
  test("should handle a search and not finding anything", () => {
    assert.deepEqual(filterBySearch("augur", defaultKeys)(defaultItems), []);
  });

  test("should handle a null parentValue in an array", () => {
    // look against a key that i know is null in the test data, this should force parentValue = null and an early exit from checkArrayMatch
    const customKeys = defaultKeys;
    customKeys.push(["consensus"]);
    assert.deepEqual(
      filterBySearch("0xdeadbeef?", customKeys)(defaultItems),
      []
    );
  });

  test(
    "should handle a search and finding markets because of description match",
    () => {
      assert.deepEqual(
        filterBySearch("test description", defaultKeys)(defaultItems),
        ["testMarketId", "testMarketId2"]
      );
    }
  );

  test(
    "should handle a search and finding a market because of tags match",
    () => {
      assert.deepEqual(filterBySearch("tag2", defaultKeys)(defaultItems), [
        "testMarketId2"
      ]);
    }
  );

  test(
    "should handle a search and finding a market because of outcomes match",
    () => {
      assert.deepEqual(filterBySearch("outcome", defaultKeys)(defaultItems), [
        "testMarketId"
      ]);
    }
  );

  test("should handle a Object parentValue for checkArrayMatch", () => {
    const customKeys = defaultKeys;
    customKeys.push(["outstandingShares", "full"]);
    assert.deepEqual(filterBySearch("shares", customKeys)(defaultItems), [
      "testMarketId",
      "testMarketId2"
    ]);
  });
});
