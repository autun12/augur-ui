import mockStore from "test/mockStore";
import speedomatic from "speedomatic";
import { formatGasCostToEther } from "utils/format-number";

import {
  purchaseParticipationTokens,
  __RewireAPI__ as ReWireModule
} from "modules/reporting/actions/purchase-participation-tokens";

describe("purchase participation tokens tests", () => {
  const test = t => test(t.description, done => t.assertions(done));
  const { store } = mockStore;

  const ACTIONS = {
    CLOSE_MODAL: { type: "CLOSE_MODAL" }
  };
  const mockRPC = { getGasPrice: () => "0x2fdaf" };

  afterEach(() => {
    store.clearActions();
  });

  test("It should handle buying 10.25 participation tokens", done => {
    ReWireModule.__Rewire__("augur", {
      api: {
        FeeWindow: {
          buy: p => {
            const { tx, _attotokens, onSent, onSuccess, onFailed } = p;
            expect(tx).toEqual({ to: "0xfeeWindow01", estimateGas: false });
            expect(_attotokens).toEqual(speedomatic.fix("10.25", "hex"));
            expect(typeof onSent).toBe("function");
            expect(typeof onSuccess).toBe("function");
            expect(typeof onFailed).toBe("function");
            onSent();
            onSuccess({});
          }
        }
      },
      reporting: {
        getFeeWindowCurrent: (p, cb) => {
          expect(p).toEqual({ universe: store.getState().universe.id });
          expect(typeof cb).toBe("function");
          cb(null, { feeWindow: "0xfeeWindow01" });
        }
      },
      rpc: mockRPC
    });

    store.dispatch(
      purchaseParticipationTokens("10.25", false, (err, res) => {
        expect(err).toBeNull();
        expect(typeof res).toBe("object");
        const expectedActions = [ACTIONS.CLOSE_MODAL];
        expect(store.getActions()).toEqual(expectedActions);
        done();
      })
    );
  });

  test("It should handle estimating gas for buying participation tokens", done => {
    ReWireModule.__Rewire__("augur", {
      api: {
        FeeWindow: {
          buy: p => {
            const { tx, _attotokens, onSent, onSuccess, onFailed } = p;
            expect(tx).toEqual({ to: "0xfeeWindow01", estimateGas: true });
            expect(_attotokens).toEqual(speedomatic.fix("10.25", "hex"));
            expect(typeof onSent).toBe("function");
            expect(typeof onSuccess).toBe("function");
            expect(typeof onFailed).toBe("function");
            onSent();
            onSuccess("0xdeadbeef");
          }
        }
      },
      reporting: {
        getFeeWindowCurrent: (p, cb) => {
          expect(p).toEqual({ universe: store.getState().universe.id });
          expect(typeof cb).toBe("function");
          cb(null, { feeWindow: "0xfeeWindow01" });
        }
      },
      rpc: mockRPC
    });

    store.dispatch(
      purchaseParticipationTokens("10.25", true, (err, res) => {
        expect(err).toBeNull();
        const expectedResponse = formatGasCostToEther(
          "0xdeadbeef",
          { decimalsRounded: 4 },
          "0x2fdaf"
        );
        expect(res).toEqual(expectedResponse);
        const expectedActions = [];
        expect(store.getActions()).toEqual(expectedActions);
        done();
      })
    );
  });

  test("It should handle an error from estimating gas for buying participation tokens", done => {
    ReWireModule.__Rewire__("augur", {
      api: {
        FeeWindow: {
          buy: p => {
            const { tx, _attotokens, onSent, onSuccess, onFailed } = p;
            expect(tx).toEqual({ to: "0xfeeWindow01", estimateGas: true });
            expect(_attotokens).toEqual(speedomatic.fix("10.25", "hex"));
            expect(typeof onSent).toBe("function");
            expect(typeof onSuccess).toBe("function");
            expect(typeof onFailed).toBe("function");
            onSent();
            onFailed({ error: 1000, message: "Uh-Oh!" });
          }
        }
      },
      reporting: {
        getFeeWindowCurrent: (p, cb) => {
          expect(p).toEqual({ universe: store.getState().universe.id });
          expect(typeof cb).toBe("function");
          cb(null, { feeWindow: "0xfeeWindow01" });
        }
      },
      rpc: mockRPC
    });

    store.dispatch(
      purchaseParticipationTokens("10.25", true, (err, res) => {
        assert.isUndefined(res);
        expect(err).toEqual({ error: 1000, message: "Uh-Oh!" });
        const expectedActions = [];
        expect(store.getActions()).toEqual(expectedActions);
        done();
      })
    );
  });

  test("It should handle an error from getting the Fee Window", done => {
    ReWireModule.__Rewire__("augur", {
      api: {
        FeeWindow: {
          buy: p => {
            expect("we should never hit this.").toBeNull();
          }
        }
      },
      reporting: {
        getFeeWindowCurrent: (p, cb) => {
          expect(p).toEqual({ universe: store.getState().universe.id });
          expect(typeof cb).toBe("function");
          cb({ error: 1000, message: "Uh-Oh!" });
        }
      },
      rpc: mockRPC
    });

    store.dispatch(
      purchaseParticipationTokens("10.25", true, (err, res) => {
        assert.isUndefined(res);
        expect(err).toEqual({ error: 1000, message: "Uh-Oh!" });
        const expectedActions = [];
        expect(store.getActions()).toEqual(expectedActions);
        done();
      })
    );
  });

  test("It should handle an null current Fee Window", done => {
    ReWireModule.__Rewire__("augur", {
      api: {
        FeeWindow: {
          buy: p => {
            expect("we should never hit this.").toBeNull();
          }
        },
        Universe: {
          buyParticipationTokens: p => {
            p.onSuccess("10.25");
          }
        }
      },
      reporting: {
        getFeeWindowCurrent: (p, cb) => {
          expect(p).toEqual({ universe: store.getState().universe.id });
          expect(typeof cb).toBe("function");
          cb(null);
        }
      },
      rpc: mockRPC
    });

    store.dispatch(
      purchaseParticipationTokens("10.25", false, (err, res) => {
        expect(err).toBeNull();
        expect(res).toEqual("10.25");
        const expectedActions = [];
        expect(store.getActions()).toEqual(expectedActions);
        done();
      })
    );
  });
});
