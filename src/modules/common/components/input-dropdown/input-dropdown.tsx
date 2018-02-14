import React, { Component } from "react";
import classNames from "classnames";
import Styles from "modules/common/components/input-dropdown/input-dropdown.styles";
type InputDropdownProps = {
  onChange: (...args: any[]) => any,
  default: string,
  options: any[],
  isMobileSmall: boolean,
  label?: string,
  className?: string
};
type InputDropdownState = {
  label: any,
  value: any,
  selected: boolean,
  showList: boolean,
  showList: boolean,
  label: any,
  value: any,
  showList: boolean,
  selected: boolean
};
class InputDropdown extends Component<InputDropdownProps, InputDropdownState> {
  constructor(props) {
    super(props);
    this.state = {
      label: props.default || props.label,
      value: props.default || "",
      showList: false,
      selected: !!props.default
    };
    this.dropdownSelect = this.dropdownSelect.bind(this);
    this.toggleList = this.toggleList.bind(this);
    this.handleWindowOnClick = this.handleWindowOnClick.bind(this);
  }
  componentDidMount() {
    window.addEventListener("click", this.handleWindowOnClick);
    if (this.props.isMobileSmall && this.state.value === "") {
      this.dropdownSelect(this.props.options[0]);
    }
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.handleWindowOnClick);
  }
  dropdownSelect(value) {
    if (value !== this.state.value) {
      this.setState({
        label: value,
        value,
        selected: true
      });
      this.props.onChange(value);
      this.toggleList();
    }
  }
  toggleList() {
    this.setState({ showList: !this.state.showList });
  }
  handleWindowOnClick(event) {
    if (
      this.refInputDropdown &&
      !this.refInputDropdown.contains(event.target)
    ) {
      this.setState({ showList: false });
    }
  }
  render() {
    const s = this.state;
    const p = this.props;
    return (
      <div
        ref={InputDropdown => {
          this.refInputDropdown = InputDropdown;
        }}
        className={classNames(Styles.InputDropdown, p.className || "")}
      >
        <button
          className={classNames(Styles.InputDropdown__label, {
            [`${Styles.selected}`]: s.selected
          })}
          onClick={this.toggleList}
        >
          {this.state.label}
        </button>
        <div
          className={classNames(Styles.InputDropdown__list, {
            [`${Styles.active}`]: this.state.showList
          })}
        >
          {p.options.map(option => (
            <button
              className={classNames({
                [`${Styles.active}`]: option === this.state.value
              })}
              key={option}
              value={option}
              onClick={() => this.dropdownSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <select
          className={classNames(Styles.InputDropdown__select, {
            [`${Styles.selected}`]: s.selected
          })}
          onChange={e => {
            this.dropdownSelect(e.target.value);
          }}
          value={this.state.value}
        >
          {p.options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <i
          className={classNames(Styles.InputDropdown__icon, "fa", {
            "fa-angle-down": !this.state.showList,
            "fa-angle-up": this.state.showList
          })}
        />
      </div>
    );
  }
}
export default InputDropdown;
