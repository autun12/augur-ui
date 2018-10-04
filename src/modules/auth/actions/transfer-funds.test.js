import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import { transferFunds } from "modules/auth/actions/transfer-funds";
import { ETH, REP } from "modules/account/constants/asset-types";

import { augur } from "services/augurjs";

jest.mock("services/augurjs");

describe("modules/auth/actions/transfer-funds.js", () => {
  let mockStore;
  beforeEach(() => {
    mockStore = configureMockStore([thunk]);
  });

  test(`should return the expected console error from the default switch`, () => {
    const state = {
      loginAccount: {
        address: "0xtest"
      }
    };
    const store = mockStore(state || {});
    const callbackFn = jest.fn();

    store.dispatch(transferFunds(10, "to-default", "0xtest2", callbackFn));
    expect(callbackFn).toHaveBeenCalled();
  });

  test(`should call the 'sendEther' method of augur when currency is ETH`, () => {
    const state = {
      loginAccount: {
        address: "0xtest"
      }
    };

    const store = mockStore(state || {});

    store.dispatch(transferFunds(10, ETH, "0xtest2"));
    expect(augur.assets.sendEther).toHaveBeenCalled();
  });

  test(`should call the 'REP' method of augur when currency is REP`, () => {
    const state = {
      loginAccount: {
        address: "0xtest"
      },
      universe: {
        id: "0xuniverse"
      }
    };
    const store = mockStore(state || {});

    const sendReputation = sinon.stub();

    transferFundsReqireAPI.__Rewire__("augur", {
      assets: {
        sendReputation
      }
    });

    store.dispatch(transferFunds(10, REP, "0xtest2"));

    assert(
      sendReputation.calledOnce,
      `didn't call 'Cash.send' once as expected`
    );
  });

  test(`should dispatch the 'updateAssets' and 'addNotification' method from the 'onSuccess' callback of 'sendEther`, () => {
    const state = {
      loginAccount: {
        address: "0xtest"
      },
      blockchain: {
        currentAugurTimestamp: 1521665
      }
    };
    const store = mockStore(state || {});
    const assets = {
      sendEther: options => {
        options.onSuccess({ hash: "0xtest" });
      }
    };

    const updateAssets = sinon.stub().returns({
      type: "updateAssets"
    });

    const addNotification = sinon.stub().returns({
      type: "addNotification"
    });

    const updateNotification = sinon.stub().returns({
      type: "updateNotification"
    });

    transferFundsReqireAPI.__Rewire__("augur", {
      assets
    });
    transferFundsReqireAPI.__Rewire__("updateAssets", updateAssets);
    transferFundsReqireAPI.__Rewire__("addNotification", addNotification);
    transferFundsReqireAPI.__Rewire__("updateNotification", updateNotification);

    store.dispatch(transferFunds(10, ETH, "0xtest2"));

    assert(
      updateNotification.calledOnce,
      `didn't call 'updateNotifications' once as expected`
    );
  });

  test(`should dispatch the 'updateAssets' method from the 'onSuccess' callback of 'sendReputation`, () => {
    const state = {
      loginAccount: {
        address: "0xtest"
      },
      universe: {
        id: "0xuniverse"
      }
    };
    const store = mockStore(state || {});

    const assets = {
      sendReputation: options => {
        options.onSuccess({ hash: "hashValue" });
      }
    };

    const updateAssets = sinon.stub().returns({
      type: "updateAssets"
    });
    transferFundsReqireAPI.__Rewire__(
      "selectCurrentTimestampInSeconds",
      () => {}
    );
    transferFundsReqireAPI.__Rewire__("augur", {
      assets
    });
    transferFundsReqireAPI.__Rewire__("updateAssets", updateAssets);

    store.dispatch(transferFunds(10, REP, "0xtest2"));
  });
});
