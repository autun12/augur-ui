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
  test({
    description: "should handle a null search",
    assertions: () => {
      assert.isNull(filterBySearch(null, [])([]));
    }
  });
  test({
    description: "should handle a empty string search",
    assertions: () => {
      assert.isNull(filterBySearch("", [])([]));
    }
  });
  test({
    description: "should handle a search and not finding anything",
    assertions: () => {
      expect(filterBySearch("augur", defaultKeys)(defaultItems)).toEqual([]);
    }
  });

  test({
    description: "should handle a null parentValue in an array",
    assertions: () => {
      // look against a key that i know is null in the test data, this should force parentValue = null and an early exit from checkArrayMatch
      const customKeys = defaultKeys;
      customKeys.push(["consensus"]);
      expect(filterBySearch("0xdeadbeef?", customKeys)(defaultItems)).toEqual([]);
    }
  });

  test({
    description:
      "should handle a search and finding markets because of description match",
    assertions: () => {
      expect(filterBySearch("test description", defaultKeys)(defaultItems)).toEqual(["testMarketId", "testMarketId2"]);
    }
  });

  test({
    description:
      "should handle a search and finding a market because of tags match",
    assertions: () => {
      expect(filterBySearch("tag2", defaultKeys)(defaultItems)).toEqual([
        "testMarketId2"
      ]);
    }
  });

  test({
    description:
      "should handle a search and finding a market because of outcomes match",
    assertions: () => {
      expect(filterBySearch("outcome", defaultKeys)(defaultItems)).toEqual([
        "testMarketId"
      ]);
    }
  });

  test({
    description: "should handle a Object parentValue for checkArrayMatch",
    assertions: () => {
      const customKeys = defaultKeys;
      customKeys.push(["outstandingShares", "full"]);
      expect(filterBySearch("shares", customKeys)(defaultItems)).toEqual([
        "testMarketId",
        "testMarketId2"
      ]);
    }
  });
});
