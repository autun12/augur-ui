import { createSelector } from 'reselect'
import store from 'src/store'
import { selectCategoriesState } from 'src/select-state'
import { WrappedBigNumber } from 'src/utils/wrapped-big-number'

export default function () {
  return selectCategories(store.getState())
}

export const selectCategories = createSelector(
  selectCategoriesState,
  categories => Object.values(categories || {})
    .filter(({ category }) => category && category !== '')
    .map(({ category, popularity }) => ({
      category,
      popularity: WrappedBigNumber(popularity),
    }))
    .sort(popularityDifference),
)

const popularityDifference = (category1, category2) => category1.popularity.isLessThan(category2.popularity)
