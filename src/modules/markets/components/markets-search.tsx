import React from "react";
import Input from "modules/common/components/input/input";
type MarketsSearchProps = {
  className?: string,
  tags?: string,
  onChangeTags?: (...args: any[]) => any
};
const MarketsSearch: React.SFC<MarketsSearchProps> = p => (
  <article className={`search-input ${p.className}`}>
    <Input
      isSearch
      isClearable
      placeholder="Search Markets"
      value={p.tags}
      onChange={p.onChangeTags}
    />
  </article>
);
export default MarketsSearch;
