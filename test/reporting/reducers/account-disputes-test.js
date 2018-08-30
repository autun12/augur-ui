import * as ActionTypes from "redux";

import { RESET_STATE } from "modules/app/actions/reset-state";
import {
  REMOVE_ACCOUNT_DISPUTE,
  UPDATE_ACCOUNT_DISPUTE,
  CLEAR_ACCOUNT_DISPUTES
} from "modules/reporting/actions/update-account-disputes";
import reducer from "modules/reporting/reducers/account-disputes-state";

describe(`modules/reporting/reducers/account-disputes-state.js`, () => {
  const test = t => {
    test(t.description, () => {
      t.assertions();
    });
  };
  const DEFAULT_STATE = {};
  const marketId1Data = {
    marketId: "marketId1",
    outcome: "0"
  };
  const marketId2Data = {
    marketId: "marketId2",
    outcome: "0"
  };

  test(`default state`, () => {
    assert.deepEqual(
      reducer(undefined, { type: ActionTypes.INIT }),
      {},
      `Didn't return expected`
    );
  });

  test(`add one dispute`, () => {
    const expected = {
      marketId1: marketId1Data
    };
    assert.deepEqual(
      reducer(undefined, {
        type: UPDATE_ACCOUNT_DISPUTE,
        data: marketId1Data
      }),
      expected,
      `Didn't return expected`
    );
  });

  test(`add multiple dispute`, () => {
    const state = reducer(
      {},
      { type: UPDATE_ACCOUNT_DISPUTE, data: marketId1Data }
    );
    const actual = reducer(state, {
      type: UPDATE_ACCOUNT_DISPUTE,
      data: marketId2Data
    });
    const expected = {
      marketId1: marketId1Data,
      marketId2: marketId2Data
    };
    assert.deepEqual(actual, expected, `Didn't return expected`);
  });

  test(`remove one dispute`, () => {
    const data = {
      marketId1: marketId1Data,
      marketId2: marketId2Data
    };
    const actual = reducer(data, {
      type: REMOVE_ACCOUNT_DISPUTE,
      data: marketId1Data
    });
    const expected = {
      marketId2: marketId2Data
    };
    assert.deepEqual(actual, expected, `Didn't return expected`);
  });

  test(`clear all account disputes`, () => {
    const data = {
      marketId1: marketId1Data,
      marketId2: marketId2Data
    };
    const actual = reducer(data, { type: CLEAR_ACCOUNT_DISPUTES });
    assert.deepEqual(actual, DEFAULT_STATE, `Didn't return expected`);
  });

  test(`reset state account disputes`, () => {
    const data = {
      marketId1: marketId1Data,
      marketId2: marketId2Data
    };
    const actual = reducer(data, { type: RESET_STATE });
    assert.deepEqual(actual, DEFAULT_STATE, `Didn't return expected`);
  });
});
