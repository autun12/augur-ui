import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  MARKET_VOLUME,
  MARKET_CREATION_TIME,
  MARKET_END_DATE,
  MARKET_RECENTLY_TRADED,
  MARKET_FEE,
  MARKET_OPEN_INTEREST
} from "modules/filter-sort/constants/market-sort-params";
import {
  MARKET_OPEN,
  MARKET_REPORTING,
  MARKET_CLOSED
} from "modules/filter-sort/constants/market-states";
import Dropdown from "modules/common/components/dropdown/dropdown";
import Styles from "modules/filter-sort/components/filter-dropdowns/filter-dropdowns.styles";
import parseQuery from "modules/routes/helpers/parse-query";
import makeQuery from "modules/routes/helpers/make-query";
import { PAGINATION_PARAM_NAME } from "modules/routes/constants/param-names";

const sortOptions = [
  { value: MARKET_CREATION_TIME, label: "Creation Time" },
  { value: MARKET_END_DATE, label: "End Time" },
  { value: MARKET_RECENTLY_TRADED, label: "Recently Traded" },
  { value: MARKET_VOLUME, label: "Volume" },
  { value: MARKET_FEE, label: "Settlement Fee" },
  { value: MARKET_OPEN_INTEREST, label: "Open Interest" }
];

const filterOptions = [
  { value: MARKET_OPEN, label: "Open" },
  { value: MARKET_REPORTING, label: "In Reporting" },
  { value: MARKET_CLOSED, label: "Resolved" }
];

export default class FilterSearch extends Component {
  static propTypes = {
    filter: PropTypes.string.isRequired,
    sort: PropTypes.string.isRequired,
    updateFilter: PropTypes.func.isRequired,
    defaultFilter: PropTypes.string.isRequired,
    defaultSort: PropTypes.string.isRequired,
    updateFilterOption: PropTypes.func.isRequired,
    updateSortOption: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.changeSortDropdown = this.changeSortDropdown.bind(this);
    this.changeFilterDropdown = this.changeFilterDropdown.bind(this);
    this.goToPageOne = this.goToPageOne.bind(this);
  }

  goToPageOne() {
    const { history, location } = this.props;
    let updatedSearch = parseQuery(location.search);

    delete updatedSearch[PAGINATION_PARAM_NAME];
    updatedSearch = makeQuery(updatedSearch);
    history.push({
      ...location,
      search: updatedSearch
    });
  }

  changeSortDropdown(value) {
    const { filter, updateSortOption, updateFilter } = this.props;

    this.goToPageOne();
    updateSortOption(value);
    updateFilter({ filter, sort: value });
  }

  changeFilterDropdown(value) {
    const { sort, updateFilterOption, updateFilter } = this.props;

    this.goToPageOne();
    updateFilterOption(value);
    updateFilter({ filter: value, sort });
  }

  render() {
    const { defaultFilter, defaultSort } = this.props;

    return (
      <div className={Styles.FilterDropdowns}>
        <Dropdown
          default={defaultFilter}
          onChange={this.changeFilterDropdown}
          options={filterOptions}
          alignLeft
        />
        <Dropdown
          default={defaultSort}
          onChange={this.changeSortDropdown}
          options={sortOptions}
        />
      </div>
    );
  }
}
