import speedomatic from "speedomatic";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

describe("modules/portfolio/actions/collect-market-creator-fees.js", () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  const test = t =>
    test(t.description, () => {
      const store = mockStore(t.state || {});
      t.assertions(store);
    });

  describe("collectMarketCreatorFees", () => {
    const {
      collectMarketCreatorFees,
      __RewireAPI__
    } = require("modules/portfolio/actions/collect-market-creator-fees.js");

    const ACTIONS = {
      UPDATE_MARKETS_DATA: "UPDATE_MARKETS_DATA",
      UPDATE_UNCLAIMED_DATA: "UPDATE_UNCLAIMED_DATA"
    };
    const MailboxAddresses = ["0xmailbox01", "0xmailbox02"];
    const MarketIds = ["0xmyMarket01", "0xmyMarket02"];

    __RewireAPI__.__Rewire__("augur", {
      api: {
        Cash: {
          balanceOf: (params, cb) => {
            assert.oneOf(
              params._owner,
              MailboxAddresses,
              `Didn't get the expected params`
            );
            expect(typeof cb).toBe("function");
            if (params._owner === MailboxAddresses[0]) {
              cb(null, speedomatic.fix(20, "string"));
            } else {
              cb(null, 0);
            }
          }
        },
        Market: {
          getMarketCreatorMailbox: (params, cb) => {
            assert.oneOf(
              params.tx.to,
              MarketIds,
              `Didn't get the expected params`
            );
            expect(typeof cb).toBe("function");
            if (params.tx.to === MarketIds[0]) {
              cb(null, MailboxAddresses[0]);
            } else {
              cb(null, MailboxAddresses[1]);
            }
          }
        },
        Mailbox: {
          withdrawEther: p => {
            // this should only ever get called by that first Market Mailbox, and not the second.
            expect(p.tx).toEqual({ to: MailboxAddresses[0] });
            expect(typeof p.onSent).toBe("function");
            expect(typeof p.onSuccess).toBe("function");
            expect(typeof p.onFailed).toBe("function");
            p.onSuccess();
          }
        }
      },
      rpc: {
        eth: {
          getBalance: (params, cb) => {
            assert.oneOf(
              params[0],
              MailboxAddresses,
              `Didn't receive the expected params to augur.rpc.eth.balance`
            );
            expect(typeof cb).toBe("function");
            // allows to test against mailboxes with currency and without.
            if (params[0] === MailboxAddresses[0]) {
              cb(null, speedomatic.fix(10.5, "string"));
            } else {
              cb(null, 0);
            }
          }
        }
      }
    });
    __RewireAPI__.__Rewire__("loadMarketsInfo", marketIds => ({
      type: ACTIONS.UPDATE_MARKETS_DATA,
      data: {
        marketIds
      }
    }));
    __RewireAPI__.__Rewire__("loadUnclaimedFees", marketId => ({
      type: ACTIONS.UPDATE_UNCLAIMED_DATA,
      data: {
        marketId
      }
    }));

    test({
      description: `Should fire a withdrawEther and updateMarketsData if we have ETH to collect from a market.`,
      state: {
        loginAccount: {
          address: "ADDRESS"
        }
      },
      assertions: store => {
        store.dispatch(
          collectMarketCreatorFees(
            false,
            MarketIds[0],
            (err, amountOfEthToBeCollected) => {
              assert.isNull(err, `Didn't return null for error as expected`);
              expect(amountOfEthToBeCollected).toEqual("30.5");
            }
          )
        );

        const actual = store.getActions();

        const expected = [
          {
            type: ACTIONS.UPDATE_MARKETS_DATA,
            data: {
              marketIds: [MarketIds[0]]
            }
          },
          {
            type: ACTIONS.UPDATE_UNCLAIMED_DATA,
            data: {
              marketId: [MarketIds[0]]
            }
          }
        ];

        expect(actual).toEqual(expected);
      }
    });

    test({
      description: `Shouldn't fire a withdrawEther or updateMarketsData if we have 0 ETH to collect from a market.`,
      state: {
        loginAccount: {
          address: "ADDRESS"
        }
      },
      assertions: store => {
        store.dispatch(
          collectMarketCreatorFees(
            false,
            MarketIds[1],
            (err, amountOfEthToBeCollected) => {
              assert.isNull(err, `Didn't return null for error as expected`);
              expect(amountOfEthToBeCollected).toEqual("0");
            }
          )
        );

        const actual = store.getActions();

        const expected = [];

        expect(actual).toEqual(expected);
      }
    });
  });
});
