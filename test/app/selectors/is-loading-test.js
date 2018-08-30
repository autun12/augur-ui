import {
  MARKET_INFO_LOADED,
  MARKET_INFO_LOADING,
  MARKET_FULLY_LOADED,
  MARKET_FULLY_LOADING
} from "modules/market/constants/market-loading-states";
import { isLoading } from "modules/app/selectors/is-loading";

describe(`modules/app/selectors/is-loading.js`, () => {
  const test = t => it(t.description, () => t.assertions());

  it(`empty should be false`, () => {
    const value = {};
    const actual = isLoading(value);

    assert.strictEqual(actual, false, `didn't return expected value`);
  });

  it(`non loading should be false`, () => {
    const value = {
      marketId: MARKET_INFO_LOADED,
      marketId2: MARKET_FULLY_LOADED
    };

    const actual = isLoading(value);

    assert.strictEqual(actual, false, `didn't return expected value`);
  });

  it(`some loading should be true`, () => {
    const value = {
      marketId: MARKET_INFO_LOADED,
      marketId2: MARKET_FULLY_LOADED,
      marketId3: MARKET_INFO_LOADING
    };

    const actual = isLoading(value);

    assert.strictEqual(actual, true, `didn't return expected value`);
  });

  it(`all loading should be true`, () => {
    const value = {
      marketId2: MARKET_FULLY_LOADING,
      marketId3: MARKET_INFO_LOADING
    };

    const actual = isLoading(value);

    assert.strictEqual(actual, true, `didn't return expected value`);
  });
});
