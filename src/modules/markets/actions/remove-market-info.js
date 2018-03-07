export const REMOVE_MARKET_INFO = 'REMOVE_MARKET_INFO'

export default function removeMarketInfo(marketId) {
  return {
    action: REMOVE_MARKET_INFO,
    marketId,
  }
}
