import { describe, it } from 'mocha'
import { assert } from 'chai'

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { match, spy, stub } from 'sinon'

import {
  UPDATE_MARKETS_LOADING_STATUS, updateMarketsData,
  updateMarketsLoadingStatus
} from 'src/modules/markets/actions/update-markets-data'
import { REMOVE_MARKET_INFO } from 'src/modules/markets/actions/remove-market-info'

import { loadMarketsInfo, __RewireAPI__ as loadMarketsInfoRewireAPI } from './load-markets-info'

describe('load-markets-info', () => {
  const mockStore = configureMockStore([thunk])
  const marketIds = ['0x000000', '0x000001']

  const mockAugur = {
    markets: {
      getMarketsInfo: () => ({}),
    },
  }

  before(() => {
    getMarketsInfoStub = stub(mockAugur.markets, 'getMarketsInfo')
    loadMarketsInfoRewireAPI.__Rewire__('augur', mockAugur)
  })

  after(() => {
    loadMarketsInfoRewireAPI.__ResetDependency__('augur')
  })

  let callbackSpy
  let getMarketsInfoStub
  let store
  beforeEach(() => {
    callbackSpy = spy()
    getMarketsInfoStub.reset()
    store = mockStore({})

    store.dispatch(loadMarketsInfo(marketIds, callbackSpy))
  })

  it('should update market loading status', () => {
    assert.deepEqual(store.getActions(), [{
      type: UPDATE_MARKETS_LOADING_STATUS,
      marketIds,
      isLoading: true,
    }])
  })

  it('should pass marketIds to augur.js', () => {
    assert.ok(getMarketsInfoStub.calledWith({ marketIds }, match.func))
  })

  describe('on error', () => {
    let err
    beforeEach(() => {
      err = new Error('Twas an error')
    })

    it('should be passed to callback', () => {
      getMarketsInfoStub.callArgWith(1, err)

      assert.equal(callbackSpy.callCount, 1)
      assert.equal(callbackSpy.firstCall.args[0], err)
    })
  })

  describe('when null markets are returned', () => {
    beforeEach(() => {
      // This might be a terrible idea from an readability perspective.
      store.clearActions()

      // Invoke augur callback
      getMarketsInfoStub.callArgWith(1, null, [null, null])
    })

    it('should dispatch removeMarketInfo and updateMarketsLoadingStatus action for each null market', () => {
      assert.deepEqual(store.getActions(), [{
        action: REMOVE_MARKET_INFO,
        marketId: marketIds[0],
      }, {
        action: UPDATE_MARKETS_LOADING_STATUS,
        marketIds: [
          marketIds[0],
        ],
        isLoading: false,
      }, {
        action: REMOVE_MARKET_INFO,
        marketId: marketIds[1],
      }, {
        action: UPDATE_MARKETS_LOADING_STATUS,
        marketIds: [
          marketIds[1],
        ],
        isLoading: false,
      }])
    })
  })

  describe('when valid market data is returned', () => {
    const marketData = [{

    }, {

    }]

    beforeEach(() => {
      // This might be a terrible idea from an readability perspective.
      store.clearActions()

      // Invoke augur callback
      getMarketsInfoStub.callArgWith(1, null, marketData)
    })


    it('should dispatch updateMarketsData and updateMarketsLoadingStatus actions for each market', () => {

    })
  })




})
