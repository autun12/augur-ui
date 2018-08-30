import {
  calculatePercentage,
  calculateTentativeCurrentRep,
  calculateAddedStakePercentage,
  __RewireAPI__ as RewireAPI
} from "modules/reporting/helpers/progress-calculations";
import { createBigNumber } from "src/utils/create-big-number";

describe(`modules/reporting/helpers/progress-calculations.js`, () => {
  const test = t => {
    it(t.description, () => {
      t.assertions();
    });
  };

  const formatAttoRepStubb = (a, format) => {
    const value = { formatted: a.toString() };
    return value;
  };

  RewireAPI.__Rewire__("formatAttoRep", formatAttoRepStubb);

  it(`value remaining tentative stake REP`, () => {
    assert.deepEqual(
      calculateTentativeCurrentRep(
        createBigNumber("34000000000000000000", 10),
        1
      ),
      "35000000000000000000",
      `Didn't return expected`
    );
  });

  it(`large value remaining tentative stake REP`, () => {
    assert.deepEqual(
      calculateTentativeCurrentRep(
        createBigNumber("349680582682291650", 10),
        1
      ),
      "1349680582682291700",
      `Didn't return expected`
    );
  });

  it(`add REP stake get percentage`, () => {
    assert.deepEqual(
      calculateAddedStakePercentage(createBigNumber("10", 10), 0, 1),
      10,
      `Didn't return expected`
    );
  });

  it(`add REP stake get percentage`, () => {
    assert.deepEqual(
      calculateAddedStakePercentage(
        createBigNumber("20", 10),
        createBigNumber("10", 10),
        1
      ),
      55,
      `Didn't return expected`
    );
  });

  it(`0 numbers, percentage calculation`, () => {
    assert.deepEqual(
      calculatePercentage(0, 5),
      0,
      `Didn't throw error as expected`
    );
  });

  it(`null numbers, percentage calculation`, () => {
    assert.deepEqual(
      calculatePercentage(null, 5),
      0,
      `Didn't throw error as expected`
    );
  });

  it(`negative numbers, percentage calculation`, () => {
    assert.deepEqual(
      calculatePercentage(-10, 5),
      0,
      `Didn't throw error as expected`
    );
  });

  it(`small numbers, percentage calculation`, () => {
    assert.deepEqual(
      calculatePercentage(10, 5),
      50,
      `Didn't call the expected method`
    );
  });

  it(`large percentage calculation`, () => {
    assert.deepEqual(
      calculatePercentage(
        createBigNumber("2098083496093750000", 10),
        createBigNumber("109680582682291650", 10)
      ),
      5.2276,
      `Didn't call the expected method`
    );
  });
});
