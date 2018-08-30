import { constants } from "services/augurjs";
import {
  TYPE_VIEW,
  TYPE_REPORT,
  TYPE_DISPUTE,
  TYPE_TRADE
} from "modules/market/constants/link-types";
import { determineMarketLinkType } from "modules/market/helpers/determine-market-link-type";

describe(`modules/market/helpers/determine-market-link-type.js`, () => {
  const account = { address: "userId" };

  const test = t => {
    test(t.description, () => {
      t.assertions();
    });
  };

  describe("empty market", () => {
    test({
      description: `should call the expected method`,
      assertions: () => {
        const market = {};
        const actual = determineMarketLinkType(market, account);
        expect(actual).toEqual(TYPE_VIEW);
      }
    });
  });

  describe("empty login account", () => {
    test({
      description: `should call the expected method`,
      assertions: () => {
        const market = {
          reportingState: constants.REPORTING_STATE.PRE_REPORTING
        };
        const actual = determineMarketLinkType(market, {});
        expect(actual).toEqual(TYPE_VIEW);
      }
    });
  });

  describe("null market", () => {
    test({
      description: `should call the expected method`,
      assertions: () => {
        const market = null;
        const actual = determineMarketLinkType(market, account);
        expect(actual).toEqual(TYPE_VIEW);
      }
    });
  });

  describe("pre reporting market", () => {
    test({
      description: `should call the expected method`,
      assertions: () => {
        const market = {
          reportingState: constants.REPORTING_STATE.PRE_REPORTING
        };
        const actual = determineMarketLinkType(market, account);
        expect(actual).toEqual(TYPE_TRADE);
      }
    });
  });

  describe("designated reporting market", () => {
    test({
      description: `should call the expected method`,
      assertions: () => {
        const market = {
          reportingState: constants.REPORTING_STATE.DESIGNATED_REPORTING,
          designatedReporter: account.address
        };
        const actual = determineMarketLinkType(market, account);
        expect(actual).toEqual(TYPE_REPORT);
      }
    });
  });

  describe("non-designated reporting market", () => {
    test({
      description: `should call the expected method`,
      assertions: () => {
        const market = {
          reportingState: constants.REPORTING_STATE.DESIGNATED_REPORTING,
          designatedReporter: "snuggles"
        };
        const actual = determineMarketLinkType(market, account);
        expect(actual).toEqual(TYPE_VIEW);
      }
    });
  });

  describe("open reporting market", () => {
    test({
      description: `should call the expected method`,
      assertions: () => {
        const market = {
          reportingState: constants.REPORTING_STATE.OPEN_REPORTING
        };
        const actual = determineMarketLinkType(market, account);
        expect(actual).toEqual(TYPE_REPORT);
      }
    });
  });

  describe("dispute reporting market", () => {
    test({
      description: `should call the expected method`,
      assertions: () => {
        const market = {
          reportingState: constants.REPORTING_STATE.CROWDSOURCING_DISPUTE
        };
        const actual = determineMarketLinkType(market, account);
        expect(actual).toEqual(TYPE_DISPUTE);
      }
    });
  });
});
