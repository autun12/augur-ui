import * as action from "modules/app/actions/update-connection";

describe("modules/app/actions/update-connection.js", () => {
  test(`should update the ethereum node connection status`, () => {
    const test = action.updateConnectionStatus(true);
    const out = {
      type: action.UPDATE_CONNECTION_STATUS,
      isConnected: true
    };
    expect(test).toEqual(out);
  });

  test(`should update the augur node connection status`, () => {
    const test = action.updateAugurNodeConnectionStatus(true);
    const out = {
      type: action.UPDATE_AUGUR_NODE_CONNECTION_STATUS,
      isConnected: true
    };
    expect(test).toEqual(out);
  });

  test(`should update the augur node network id`, () => {
    const test = action.updateAugurNodeNetworkId("4");
    const out = {
      type: action.UPDATE_AUGUR_NODE_NETWORK_ID,
      augurNodeNetworkId: "4"
    };
    expect(test).toEqual(out);
  });

  test(`should update the isReconnectionPaused variable`, () => {
    const test = action.updateIsReconnectionPaused(true);
    const out = {
      type: action.UPDATE_IS_RECONNECTION_PAUSED,
      isReconnectionPaused: true
    };
    expect(test).toEqual(out);
  });
});
