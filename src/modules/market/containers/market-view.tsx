import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MarketView from "modules/market/components/market-view/market-view";
import { loadFullMarket } from "modules/market/actions/load-full-market";
import parseQuery from "modules/routes/helpers/parse-query";
import getValue from "utils/get-value";
import { MARKET_ID_PARAM_NAME } from "modules/routes/constants/param-names";
const mapStateToProps = state => ({
  isLogged: state.isLogged,
  isConnected: state.connection.isConnected,
  universe: state.universe,
  marketsData: state.marketsData,
  isMobile: state.isMobile
});
const mapDispatchToProps = dispatch => ({
  loadFullMarket: marketId => dispatch(loadFullMarket(marketId))
});
const mergeProps = (sP, dP, oP) => {
  const marketId = parseQuery(oP.location.search)[MARKET_ID_PARAM_NAME];
  return {
    ...oP,
    marketId,
    isLogged: sP.isLogged,
    isConnected: sP.isConnected && getValue(sP, "universe.id") != null,
    isMarketLoaded: sP.marketsData[marketId] != null,
    loadFullMarket: () => dP.loadFullMarket(marketId)
  };
};
const Market = withRouter(
  connect(mapStateToProps, mapDispatchToProps, mergeProps)(MarketView)
);
export default Market;
