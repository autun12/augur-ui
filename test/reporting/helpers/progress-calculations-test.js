import {
  calculatePercentage,
  calculateTentativeCurrentRep,
  calculateAddedStakePercentage,
  __RewireAPI__ as RewireAPI
} from "modules/reporting/helpers/progress-calculations";
import { createBigNumber } from "src/utils/create-big-number";

describe(`modules/reporting/helpers/progress-calculations.js`, () => {
  const test = t => {
    test(t.description, () => {
      t.assertions();
    });
  };

  const formatAttoRepStubb = (a, format) => {
    const value = { formatted: a.toString() };
    return value;
  };

  RewireAPI.__Rewire__("formatAttoRep", formatAttoRepStubb);

  test({
    description: `value remaining tentative stake REP`,
    assertions: () => {
      expect(
        calculateTentativeCurrentRep(
          createBigNumber("34000000000000000000", 10),
          1
        )
      ).toEqual("35000000000000000000");
    }
  });

  test({
    description: `large value remaining tentative stake REP`,
    assertions: () => {
      expect(
        calculateTentativeCurrentRep(
          createBigNumber("349680582682291650", 10),
          1
        )
      ).toEqual("1349680582682291700");
    }
  });

  test({
    description: `add REP stake get percentage`,
    assertions: () => {
      expect(
        calculateAddedStakePercentage(createBigNumber("10", 10), 0, 1)
      ).toEqual(10);
    }
  });

  test({
    description: `add REP stake get percentage`,
    assertions: () => {
      expect(
        calculateAddedStakePercentage(
          createBigNumber("20", 10),
          createBigNumber("10", 10),
          1
        )
      ).toEqual(55);
    }
  });

  test({
    description: `0 numbers, percentage calculation`,
    assertions: () => {
      expect(calculatePercentage(0, 5)).toEqual(0);
    }
  });

  test({
    description: `null numbers, percentage calculation`,
    assertions: () => {
      expect(calculatePercentage(null, 5)).toEqual(0);
    }
  });

  test({
    description: `negative numbers, percentage calculation`,
    assertions: () => {
      expect(calculatePercentage(-10, 5)).toEqual(0);
    }
  });

  test({
    description: `small numbers, percentage calculation`,
    assertions: () => {
      expect(calculatePercentage(10, 5)).toEqual(50);
    }
  });

  test({
    description: `large percentage calculation`,
    assertions: () => {
      expect(
        calculatePercentage(
          createBigNumber("2098083496093750000", 10),
          createBigNumber("109680582682291650", 10)
        )
      ).toEqual(5.2276);
    }
  });
});
