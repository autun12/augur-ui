import { augur } from 'services/augurjs'
import logError from 'utils/log-error'

/**
 *
 * @typedef {Object} LoadCandleStickDataOptions
 * @property {string} marketId
 * @property {number} outcome
 * @property {number} start
 * @property {number} end
 * @property {number} period
 */

/**
 *
 * @param {LoadCandleStickDataOptions} options
 * @param {function} callback
 */
export const loadCandleStickData = (options = {}, callback = logError) => {
  augur.augurNode.submitRequest('getMarketPriceCandlesticks', options, (err, data) => {
    if (err) return callback(err)
    callback(null, data)
  })
}
