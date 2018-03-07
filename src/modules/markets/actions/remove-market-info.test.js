import { describe, it } from 'mocha'
import { assert } from 'chai'

import removeMarketInfo, { REMOVE_MARKET_INFO } from 'modules/markets/actions/remove-market-info'

describe('remove-market-info', () => {
  it('should return an action object with marketId attribute', () => {
    const someMarketId = '0x12345'
    const expected = {
      action: REMOVE_MARKET_INFO,
      marketId: someMarketId,
    }

    const result = removeMarketInfo(someMarketId)
    assert.deepEqual(expected, result)
  })
})
