import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import makePath from "modules/routes/helpers/make-path";
import { AUTHENTICATION } from "modules/routes/constants/views";
type AuthenticatedRouteProps = {
  component?: any,
  isLogged: boolean
};
const AuthenticatedRoute: React.SFC<AuthenticatedRouteProps> = ({
  component: Component,
  isLogged,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isLogged ? (
        <Component {...props} />
      ) : (
        <Redirect push to={makePath(AUTHENTICATION)} />
      )
    }
  />
);
const mapStateToProps = state => ({
  isLogged: state.isLogged
});
export default connect(mapStateToProps)(AuthenticatedRoute);
