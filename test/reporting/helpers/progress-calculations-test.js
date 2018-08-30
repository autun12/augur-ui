import {
  calculatePercentage,
  calculateTentativeCurrentRep,
  calculateAddedStakePercentage,
  __RewireAPI__ as RewireAPI
} from "modules/reporting/helpers/progress-calculations";
import { createBigNumber } from "src/utils/create-big-number";

describe(`modules/reporting/helpers/progress-calculations.js`, () => {
  const oldtest = t => {
    test(t.description, () => {
      t.assertions();
    });
  };

  const formatAttoRepStubb = (a, format) => {
    const value = { formatted: a.toString() };
    return value;
  };

  RewireAPI.__Rewire__("formatAttoRep", formatAttoRepStubb);

  test(`value remaining tentative stake REP`, () => {
    expect(
      calculateTentativeCurrentRep(
        createBigNumber("34000000000000000000", 10),
        1
      )
    ).toEqual("35000000000000000000");
  });

  test(`large value remaining tentative stake REP`, () => {
    expect(
      calculateTentativeCurrentRep(createBigNumber("349680582682291650", 10), 1)
    ).toEqual("1349680582682291700");
  });

  test(`add REP stake get percentage`, () => {
    expect(
      calculateAddedStakePercentage(createBigNumber("10", 10), 0, 1)
    ).toEqual(10);
  });

  test(`add REP stake get percentage`, () => {
    expect(
      calculateAddedStakePercentage(
        createBigNumber("20", 10),
        createBigNumber("10", 10),
        1
      )
    ).toEqual(55);
  });

  test(`0 numbers, percentage calculation`, () => {
    expect(calculatePercentage(0, 5)).toEqual(0);
  });

  test(`null numbers, percentage calculation`, () => {
    expect(calculatePercentage(null, 5)).toEqual(0);
  });

  test(`negative numbers, percentage calculation`, () => {
    expect(calculatePercentage(-10, 5)).toEqual(0);
  });

  test(`small numbers, percentage calculation`, () => {
    expect(calculatePercentage(10, 5)).toEqual(50);
  });

  test(`large percentage calculation`, () => {
    expect(
      calculatePercentage(
        createBigNumber("2098083496093750000", 10),
        createBigNumber("109680582682291650", 10)
      )
    ).toEqual(5.2276);
  });
});
