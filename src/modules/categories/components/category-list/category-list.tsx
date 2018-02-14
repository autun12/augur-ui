import React from "react";
import Category from "modules/categories/components/category/category";
import Styles from "modules/categories/components/category-list/category-list.styles";
type CategoryListProps = {
  categories: any[],
  lowerBound?: number,
  boundedLength?: number
};
const CategoryList: React.SFC<CategoryListProps> = p => {
  const isShortList = p.categories.length <= 2;
  const arrayLength = isShortList ? p.categories.length : p.boundedLength;
  const categoryStyling = isShortList
    ? Styles["CategoryList__categorywrap-short"]
    : Styles.CategoryList__categorywrap;
  return (
    <div className={Styles.CategoryList}>
      {[...Array(arrayLength)].map((_, i) => {
        const categoryIndex = p.lowerBound - 1 + i;
        const category =
          p.categories && p.categories[categoryIndex]
            ? p.categories[categoryIndex]
            : null;
        return (
          <div
            className={categoryStyling}
            key={
              category !== null
                ? JSON.stringify(category)
                : `${JSON.stringify(category)}${categoryIndex}`
            }
          >
            <Category
              category={category !== null ? category.category : "null-category"}
              popularity={category !== null ? category.popularity : 0}
            />
          </div>
        );
      })}
    </div>
  );
};
export default CategoryList;
