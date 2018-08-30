import {
  MARKET_INFO_LOADED,
  MARKET_INFO_LOADING,
  MARKET_FULLY_LOADED,
  MARKET_FULLY_LOADING
} from "modules/market/constants/market-loading-states";
import { isLoading } from "modules/app/selectors/is-loading";

describe(`modules/app/selectors/is-loading.js`, () => {
  test(`empty should be false`, () => {
    const value = {};
    const actual = isLoading(value);

    expect(actual).toBe(false);
  });

  test(`non loading should be false`, () => {
    const value = {
      marketId: MARKET_INFO_LOADED,
      marketId2: MARKET_FULLY_LOADED
    };

    const actual = isLoading(value);

    expect(actual).toBe(false);
  });

  test(`some loading should be true`, () => {
    const value = {
      marketId: MARKET_INFO_LOADED,
      marketId2: MARKET_FULLY_LOADED,
      marketId3: MARKET_INFO_LOADING
    };

    const actual = isLoading(value);

    expect(actual).toBe(true);
  });

  test(`all loading should be true`, () => {
    const value = {
      marketId2: MARKET_FULLY_LOADING,
      marketId3: MARKET_INFO_LOADING
    };

    const actual = isLoading(value);

    expect(actual).toBe(true);
  });
});
