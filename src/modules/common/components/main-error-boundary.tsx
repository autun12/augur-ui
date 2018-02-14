import React, { Component } from "react";
type MainErrorBoundaryState = {
  hasError: boolean,
  hasError: boolean,
  hasError: boolean
};
export default class MainErrorBoundary extends Component<
  {},
  MainErrorBoundaryState
> {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.hasError) {
      this.setState({ hasError: false });
    }
  }
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      return (
        <section
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            width: "100%"
          }}
        >
          <h1
            style={{
              fontSize: "5rem",
              lineHeight: "5rem",
              marginBottom: "2rem"
            }}
          >
            (ノಠ益ಠ)ノ彡┻━┻
          </h1>
          <span>please reference the console</span>
        </section>
      );
    }
    return this.props.children;
  }
}
