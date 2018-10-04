import sinon from "sinon";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { updateAssets } from "modules/auth/actions/update-assets";
import { updateLoginAccount } from "modules/auth/actions/update-login-account";

jest.genMockFromModule("modules/auth/actions/update-login-account");

import { __RewireAPI__ as updateEtherBalanceRewireAPI } from "modules/auth/actions/update-ether-balance";

const ETH = "eth";
const REP = "rep";

describe("modules/auth/actions/update-assets.js", () => {
  let mockStore;
  let updateLoginAccountSpy;

  beforeEach(() => {
    updateLoginAccount.mockStore = configureMockStore([thunk]);
  });

  afterEach(() => {
    stubbedUpdateLoginAccount.resetHistory();
  });
  const stubbedUpdateLoginAccount = sinon.stub().returns({
    type: "updateLoginAccount"
  });
  updateAssetsRewireAPI.__Rewire__(
    "updateLoginAccount",
    stubbedUpdateLoginAccount
  );

  test(`should dispatch 'updateLoginAccount' if a user is unlogged`, () => {
    const state = {
      loginAccount: {},
      universe: {
        id: "blah"
      }
    };
    const store = mockStore(state || {});

    store.dispatch(updateAssets());
    assert(
      stubbedUpdateLoginAccount.calledOnce,
      `didn't call 'updateLoginAccount' once as expected`
    );
  });
  describe("loadAssets callbacks", () => {
    const callbackTests = asset => {
      describe(`${asset}`, () => {
        afterEach(() => {
          updateAssetsRewireAPI.__ResetDependency__("augur");
        });
        test(`should call the callback with the expected error`, () => {
          const state = {
            loginAccount: {
              address: "0xtest"
            },
            universe: {
              id: "0xuniverse"
            },
            address: "0xtest"
          };
          const store = mockStore(state || {});

          const ERR = {
            error: `${asset}-failure`
          };
          updateEtherBalanceRewireAPI.__Rewire__("augur", {
            rpc: {
              eth: {
                getBalance: (value, callback) => {
                  callback(ERR, "1000");
                }
              }
            }
          });
          updateAssetsRewireAPI.__Rewire__("augur", {
            api: {
              Universe: {
                getReputationToken: (value, callback) => {
                  callback(ERR, "10000");
                }
              },
              ReputationToken: {
                balanceOf: (value, callback) => {
                  callback(ERR, "10000");
                }
              },
              LegacyReputationToken: {
                balanceOf: (value, callback) => {
                  callback(ERR, "2000");
                },
                allowance: (value, callback) => {
                  callback(ERR, "0");
                }
              }
            }
          });
          updateAssetsRewireAPI.__Rewire__("updateEtherBalance", () => ({
            type: "UPDATE_ASSETS"
          }));
          const callbackStub = {
            callback: () => {}
          };
          sinon
            .stub(callbackStub, "callback")
            .callsFake(err =>
              assert.deepEqual(
                err,
                ERR,
                `didn't call the callback with the expected error`
              )
            );
          store.dispatch(updateAssets(callbackStub.callback));
        });
        test(`should dispatch 'updateLoginAccount' if value is not present`, () => {
          const state = {
            loginAccount: {},
            universe: {
              id: "myId"
            }
          };
          const store = mockStore(state || {});

          updateAssetsRewireAPI.__Rewire__("augur", {});
          updateEtherBalanceRewireAPI.__Rewire__("augur", {});
          store.dispatch(updateAssets());
          assert(
            stubbedUpdateLoginAccount.calledOnce,
            `didn't call 'updateLoginAccount' once as expected`
          );
        });
        test(`should dispatch 'updateLoginAccount' if value is present but doesn't equal updated value`, () => {
          const state = {
            loginAccount: {
              [`${asset}`]: "11"
            },
            universe: {
              id: "myId"
            }
          };
          const store = mockStore(state || {});

          updateAssetsRewireAPI.__Rewire__("augur", {});
          updateEtherBalanceRewireAPI.__Rewire__("augur", {});
          store.dispatch(updateAssets());
          assert(
            stubbedUpdateLoginAccount.calledOnce,
            `didn't call 'updateLoginAccount' once as expected`
          );
        });
        test(`should call the callback with the balances once all have loaded`, () => {
          const state = {
            loginAccount: {
              address: "0xtest",
              ethTokens: "10",
              eth: "10",
              rep: "10",
              legacyRep: "10",
              legacyRepAllowance: "0"
            },
            universe: {
              id: "0xuniverse"
            }
          };
          const store = mockStore(state || {});

          const speedomatic = {
            unfix: (value, str) => {}
          };
          sinon.stub(speedomatic, "unfix").returnsArg(0);
          updateAssetsRewireAPI.__Rewire__("speedomatic", speedomatic);
          const testValue = {
            eth: 10,
            legacyRep: 2000,
            rep: 20
          };
          updateEtherBalanceRewireAPI.__Rewire__("augur", {
            rpc: {
              eth: {
                getBalance: (value, callback) => {
                  callback(null, testValue.eth);
                }
              }
            }
          });
          updateAssetsRewireAPI.__Rewire__("augur", {
            api: {
              Universe: {
                getReputationToken: (value, callback) => {
                  callback(null, "0xtestx0");
                }
              },
              ReputationToken: {
                balanceOf: (value, callback) => {
                  callback(null, testValue.rep);
                }
              },
              LegacyReputationToken: {
                balanceOf: (value, callback) => {
                  callback(null, testValue.legacyRep);
                },
                allowance: (value, callback) => {
                  callback(null, testValue.legacyRepAllowance);
                }
              }
            }
          });
          const callbackStub = {
            callback: () => {}
          };
          sinon.stub(callbackStub, "callback").callsFake((err, balances) => {
            assert.isNull(
              err,
              `didn't call the callback with the expected error`
            );
            expect(balances).toEqual(testValue);
          });
          store.dispatch(updateAssets(callbackStub.callback));
        });
      });
    };
    callbackTests(ETH);
    callbackTests(REP);
  });
});
