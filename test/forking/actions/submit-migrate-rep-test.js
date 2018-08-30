import { YES_NO } from "modules/markets/constants/market-types";
import {
  submitMigrateREP,
  __RewireAPI__ as ReWireModule
} from "modules/forking/actions/submit-migrate-rep";

describe("modules/forking/actions/submit-migrate-rep.js", () => {
  describe("submitMigrateREP", () => {
    test("should call the function as expected", () => {
      const stateData = {
        loginAccount: {
          meta: "META"
        },
        universe: {
          id: "0xUNIVERSE"
        },
        marketsData: {
          "0xMARKET": {
            maxPrice: 1,
            minPrice: 0,
            numTicks: 10000,
            marketType: YES_NO
          }
        }
      };

      const getState = () => stateData;

      ReWireModule.__Rewire__("augur", {
        api: {
          Universe: {
            getReputationToken: (args, callback) => {
              expect(args).toEqual({
                tx: { to: "0xUNIVERSE" }
              });
              return callback(null, "0xREP_TOKEN");
            }
          },
          ReputationToken: {
            migrateOutByPayout: args => {
              expect(args.tx).toEqual({
                to: "0xREP_TOKEN",
                estimateGas: false
              });
              expect(args.meta).toEqual("META");
              expect(args._invalid).toEqual(false);
              expect(args._payoutNumerators.map(n => n.toString())).toEqual([
                "0",
                "10000"
              ]);
              expect(args._attotokens).toEqual(42);
            }
          }
        }
      });

      submitMigrateREP(false, "0xMARKET", 1, false, 42, null, () => {})(
        null,
        getState
      );
    });
  });
});
