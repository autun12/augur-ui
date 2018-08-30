import {
  migrateMarketThroughFork,
  __RewireAPI__ as ReWireModule
} from "modules/forking/actions/migrate-market-through-fork";

describe("modules/forking/actions/migrate-market-through-fork.js", () => {
  const test = t => test(t.description, () => t.assertions());

  describe("migrateMarketThroughFork", () => {
    test("should call the function as expected", () => {
      const stateData = {
        loginAccount: {
          meta: "META"
        }
      };

      const getState = () => stateData;

      ReWireModule.__Rewire__("augur", {
        api: {
          Market: {
            migrateThroughOneFork: args => {
              expect(args.tx).toEqual({
                to: "0xMARKET",
                estimateGas: false
              });
              return args.onSuccess(null);
            }
          }
        }
      });

      migrateMarketThroughFork("0xMARKET", false, () => {})(() => {}, getState);
    });
  });
});
