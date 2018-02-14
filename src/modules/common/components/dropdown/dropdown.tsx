import React, { Component } from "react";
import classNames from "classnames";
import Styles from "modules/common/components/dropdown/dropdown.styles";
type DropdownProps = {
  onChange: (...args: any[]) => any,
  default: string,
  options: any[]
};
type DropdownState = {
  label: any,
  value: any,
  showList: boolean,
  showList: boolean,
  label: any,
  value: any,
  showList: boolean
};
class Dropdown extends Component<DropdownProps, DropdownState> {
  constructor(props) {
    super(props);
    const defaultOption =
      props.options.find(option => option.value === props.default) || false;
    this.state = {
      label: (defaultOption && defaultOption.label) || props.options[0].label,
      value: (defaultOption && defaultOption.value) || props.options[0].value,
      showList: false
    };
    this.dropdownSelect = this.dropdownSelect.bind(this);
    this.toggleList = this.toggleList.bind(this);
    this.handleWindowOnClick = this.handleWindowOnClick.bind(this);
  }
  componentDidMount() {
    window.addEventListener("click", this.handleWindowOnClick);
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.handleWindowOnClick);
  }
  dropdownSelect(label, value) {
    if (value !== this.state.value) {
      this.setState({
        label,
        value
      });
      this.props.onChange(value);
      this.toggleList();
    }
  }
  toggleList() {
    this.setState({ showList: !this.state.showList });
  }
  handleWindowOnClick(event) {
    if (this.refDropdown && !this.refDropdown.contains(event.target)) {
      this.setState({ showList: false });
    }
  }
  render() {
    const p = this.props;
    return (
      <div
        className={Styles.Dropdown}
        ref={dropdown => {
          this.refDropdown = dropdown;
        }}
      >
        <button className={Styles.Dropdown__label} onClick={this.toggleList}>
          {this.state.label}
        </button>
        <div
          className={classNames(Styles.Dropdown__list, {
            [`${Styles.active}`]: this.state.showList
          })}
        >
          {p.options.map(option => (
            <button
              className={classNames({
                [`${Styles.active}`]: option.value === this.state.value
              })}
              key={option.value}
              value={option.value}
              onClick={() => this.dropdownSelect(option.label, option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <select
          className={Styles.Dropdown__select}
          onChange={e => {
            this.dropdownSelect(
              e.target.options[e.target.selectedIndex].text,
              e.target.value
            );
          }}
          value={this.state.value}
        >
          {p.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <i
          className={classNames(
            Styles["Dropdown__angle-down"],
            "fa",
            "fa-angle-down"
          )}
        />
      </div>
    );
  }
}
export default Dropdown;
