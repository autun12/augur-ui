import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import makePath from "modules/routes/helpers/make-path";
import { CATEGORIES } from "modules/routes/constants/views";
type UnauthenticatedRouteProps = {
  component?: any,
  isLogged: boolean
};
const UnauthenticatedRoute: React.SFC<UnauthenticatedRouteProps> = ({
  component: Component,
  isLogged,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isLogged ? (
        <Component {...props} />
      ) : (
        <Redirect push to={makePath(CATEGORIES)} />
      )
    }
  />
);
const mapStateToProps = state => ({
  isLogged: state.isLogged
});
export default connect(mapStateToProps)(UnauthenticatedRoute);
