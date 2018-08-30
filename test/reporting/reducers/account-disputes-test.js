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

  test({
    description: `default state`,
    assertions: () => {
      expect(reducer(undefined, { type: ActionTypes.INIT })).toEqual({});
    }
  });

  test({
    description: `add one dispute`,
    assertions: () => {
      const expected = {
        marketId1: marketId1Data
      };
      expect(
        reducer(undefined, {
          type: UPDATE_ACCOUNT_DISPUTE,
          data: marketId1Data
        })
      ).toEqual(expected);
    }
  });

  test({
    description: `add multiple dispute`,
    assertions: () => {
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
      expect(actual).toEqual(expected);
    }
  });

  test({
    description: `remove one dispute`,
    assertions: () => {
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
      expect(actual).toEqual(expected);
    }
  });

  test({
    description: `clear all account disputes`,
    assertions: () => {
      const data = {
        marketId1: marketId1Data,
        marketId2: marketId2Data
      };
      const actual = reducer(data, { type: CLEAR_ACCOUNT_DISPUTES });
      expect(actual).toEqual(DEFAULT_STATE);
    }
  });

  test({
    description: `reset state account disputes`,
    assertions: () => {
      const data = {
        marketId1: marketId1Data,
        marketId2: marketId2Data
      };
      const actual = reducer(data, { type: RESET_STATE });
      expect(actual).toEqual(DEFAULT_STATE);
    }
  });
});
