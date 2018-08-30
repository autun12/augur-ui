import * as action from "modules/markets/actions/update-selected-markets-header";

describe(`modules/markets/actions/update-selected-markets-header.js`, () => {
  test(`should update the selected Market header`, () => {
    const selectedMarketsHeader = "myMarketHeader";
    const expectedOutput = {
      type: action.UPDATE_SELECTED_MARKETS_HEADER,
      selectedMarketsHeader
    };
    expect(action.updateSelectedMarketsHeader(selectedMarketsHeader)).toEqual(
      expectedOutput
    );
  });
});
