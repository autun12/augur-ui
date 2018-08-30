import {
  BigNumber,
  createBigNumber,
  __RewireAPI__ as ReWireModule
} from "src/utils/create-big-number";
import * as sinon from "sinon";

describe("src/utils/wrapped-big-number.js", () => {
  let spy;
  beforeEach(() => {
    spy = sinon.spy();
    ReWireModule.__Rewire__("logError", spy);
  });

  afterAll(() => {
    ReWireModule.__ResetDependency__("logError");
  });

  test("should console an error when a undefined is passed", () => {
    const result = createBigNumber(undefined);
    assert.isUndefined(result);
    expect(spy.called).toBeTruthy();
  });

  test("should console an error when a null value is passed", () => {
    const result = createBigNumber(null);
    assert.isUndefined(result);
    expect(spy.called).toBeTruthy();
  });

  test("should return a bignumber", () => {
    const result = createBigNumber("2500");
    expect(result).toBeInstanceOf(BigNumber);
    expect(spy.called).toBeFalsy();
  });

  test("should act like a big number", () => {
    expect(
      createBigNumber(2)
        .plus(createBigNumber(4))
        .toString()
    ).toEqual("6");
  });

  test("should sort like a big number", () => {
    const expected = [{ value: "77" }, { value: "12" }, { value: "4" }];
    const myObjectArray = [{ value: "12" }, { value: "4" }, { value: "77" }];
    const result = myObjectArray.sort((a, b) =>
      createBigNumber(a.value).isLessThan(createBigNumber(b.value))
    );
    expect(result).toEqual(expected);
  });
});
