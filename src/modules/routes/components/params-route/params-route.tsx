import React from "react";
import { Route, withRouter } from "react-router-dom";
import parseQuery from "modules/routes/helpers/parse-query";
type ParamsRouteProps = {
  location: object,
  component?: any
};
const ParamsRoute: React.SFC<ParamsRouteProps> = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      const currentParams = parseQuery(props.location.search);
      const shouldRender = Object.keys(rest.params).every(
        paramName =>
          currentParams[paramName] != null &&
          currentParams[paramName] === rest.params[paramName]
      );
      return shouldRender ? <Component {...props} /> : null;
    }}
  />
);
export default withRouter(ParamsRoute);
