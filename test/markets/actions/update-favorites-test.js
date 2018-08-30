import * as actions from "modules/markets/actions/update-favorites";

describe(`modules/markets/actions/update-favorites.js`, () => {
  test(`should dispatch a toggle favorite action`, () => {
    const marketId = "market123";
    const expectedOutput = {
      type: actions.TOGGLE_FAVORITE,
      marketId
    };
    expect(actions.toggleFavorite(marketId)).toEqual(expectedOutput);
  });

  test(`should dispatch a update favorites action`, () => {
    const favorites = ["some favorite", "another favorite"];
    const expectedOutput = {
      type: actions.UPDATE_FAVORITES,
      favorites
    };
    expect(actions.updateFavorites(favorites)).toEqual(expectedOutput);
  });
});
