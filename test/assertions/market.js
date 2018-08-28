import assertFormattedNumber from "assertions/common/formatted-number";
import assertFormattedDate from "assertions/common/formatted-date";
import assertReportableOutcomes from "assertions/reportable-outcomes";

export default function(market) {
  // market can be undefined
  if (!market.id) {
    return;
  }

  describe("market state", () => {
    test("market", () => {
      assert.isDefined(market);
      assert.isObject(market);
    });

    test("market.id", () => {
      assert.isDefined(market.id);
      assert.isString(market.id);
    });

    test("market.author", () => {
      assert.isDefined(market.author);
      assert.isString(market.author);
    });

    test("market.marketType", () => {
      assert.isDefined(market.marketType);
      assert.isString(market.marketType);
    });

    test("market.description", () => {
      assert.isDefined(market.description);
      assert.isString(market.description);
    });

    test("market.details", () => {
      assert.isDefined(market.details);
      assert.isString(market.details);
    });

    test("market.endTime", () => {
      assert.isDefined(market.endTime);
      assertFormattedDate(market.endTime, "market.endTime");
    });

    test("market.creationTime", () => {
      assert.isDefined(market.creationTime);
      assertFormattedDate(market.creationTime, "market.creationTime");
    });

    test("market.endTimeLabel", () => {
      assert.isDefined(market.endTimeLabel);
      assert.isString(market.endTimeLabel);
    });

    test("market.settlementFeePercent", () => {
      assert.isDefined(market.settlementFeePercent);
      assertFormattedNumber(
        market.settlementFeePercent,
        "market.settlementFeePercent"
      );
    });

    test("market.volume", () => {
      assert.isDefined(market.volume);
      assertFormattedNumber(market.volume, "market.volume");
    });

    test("market.isOpen", () => {
      assert.isDefined(market.isOpen);
      assert.isBoolean(market.isOpen);
    });

    test("market.isPendingReport", () => {
      assert.isDefined(market.isPendingReport);
      assert.isBoolean(market.isPendingReport);
    });

    const { tags } = market;
    test("market.tags", () => {
      assert.isDefined(tags);
      assert.isArray(tags);

      tags.forEach((tag, i) => {
        test(`market.tags[${i}].name`, () => {
          assert.isDefined(tag.name);
          assert.isString(tag.name);
        });

        test(`market.tags[${i}].onCLick`, () => {
          assert.isDefined(tag.onClick);
          assert.isFunction(tag.onClick);
        });
      });
    });

    test("market.outcomes", () => {
      assert.isDefined(market.outcomes);
      assert.isArray(market.outcomes);

      market.outcomes.forEach((outcome, i) => {
        test(`market.outcomes[${i}]`, () => {
          assert.isDefined(outcome);
          assert.isObject(outcome);
        });

        test(`market.outcomes[${i}].id`, () => {
          assert.isDefined(outcome.id);
          assert.isString(outcome.id);
        });

        test(`market.outcomes[${i}].name`, () => {
          assert.isDefined(outcome.name);
          assert.isString(outcome.name);
        });

        test(`market.outcomes[${i}].marketId`, () => {
          assert.isDefined(outcome.marketId);
          assert.isString(outcome.marketId);
        });

        test(`market.outcomes[${i}].lastPrice`, () => {
          assert.isDefined(outcome.lastPrice);
          assertFormattedNumber(outcome.lastPrice, "outcome.lastPrice");
        });

        test(`market.outcomes[${i}].lastPricePercent`, () => {
          assert.isDefined(outcome.lastPricePercent);
          assertFormattedNumber(
            outcome.lastPricePercent,
            "outcome.lastPricePercent"
          );
        });

        const { trade } = outcome;
        test(`market.outcomes[${i}].trade`, () => {
          assert.isDefined(trade);
          assert.isObject(trade);
        });

        test(`market.outcomes[${i}].trade.side`, () => {
          assert.isDefined(trade.side);
          assert.isString(trade.side);
        });

        test(`market.outcomes[${i}].trade.numShares`, () => {
          assert.isDefined(trade.numShares);
          assert.isNumber(trade.numShares);
        });

        test(`market.outcomes[${i}].trade.maxNumShares`, () => {
          assert.isDefined(trade.maxNumShares);
          assert.isNumber(trade.maxNumShares);
        });

        test(`market.outcomes[${i}].trade.limitPrice`, () => {
          assert.isDefined(trade.limitPrice);
          assert.isNumber(trade.limitPrice);
        });

        test(`market.outcomes[${i}].trade.tradeSummary`, () => {
          // NOTE -- shallow check here due to deep check further down of the same selector method
          assert.isDefined(trade.tradeSummary);
          assert.isObject(trade.tradeSummary);
        });

        test(`market.outcomes[${i}].trade.updateTradeOrder`, () => {
          assert.isDefined(trade.updateTradeOrder);
          assert.isFunction(trade.updateTradeOrder);
        });

        const { orderBook } = outcome;
        test(`market.outcomes[${i}].orderBook`, () => {
          // NOTE -- shallow check here due to deep check further down of the same selector method
          assert.isDefined(orderBook);
          assert.isObject(orderBook);
        });

        test(`market.outcomes[${i}].orderBook.bids`, () => {
          assert.isDefined(orderBook.bids);
          assert.isArray(orderBook.bids);
        });

        test(`market.outcomes[${i}].orderBook.asks`, () => {
          assert.isDefined(orderBook.asks);
          assert.isArray(orderBook.asks);
        });

        test(`market.outcomes[${i}].orderBook.topBid`, () => {
          // NOTE -- shallow check here due to deep check further down of the same selector method
          assert.isDefined(outcome.topBid);
        });

        test(`market.outcomes[${i}].orderBook.topAsk`, () => {
          // NOTE -- shallow check here due to deep check further down of the same selector method
          assert.isDefined(outcome.topAsk);
        });

        const { userOpenOrders } = outcome;
        test(`market.outcomes[${i}].userOpenOrders`, () => {
          assert.isDefined(userOpenOrders);
          assert.isArray(userOpenOrders);
        });

        test(`market.outcomes[${i}].userOpenOrders`, () => {
          assert.isDefined(userOpenOrders);
          assert.isArray(userOpenOrders);
        });

        userOpenOrders.forEach((openOrder, j) => {
          test(`market.outcomes[${i}].userOpenOrders[${j}]`, () => {
            assert.isDefined(openOrder);
            assert.isObject(openOrder);
          });

          test(`market.outcomes[${i}].userOpenOrders[${j}].id`, () => {
            assert.isDefined(openOrder.id);
            assert.isObject(openOrder.id);
          });

          test(`market.outcomes[${i}].userOpenOrders[${j}].marketId`, () => {
            assert.isDefined(openOrder.marketId);
            assert.isString(openOrder.marketId);
          });

          test(`market.outcomes[${i}].userOpenOrders[${j}].outcomeName`, () => {
            assert.isDefined(openOrder.outcomeName);
            assert.isString(openOrder.outcomeName);
          });

          test(`market.outcomes[${i}].userOpenOrders[${j}].type`, () => {
            assert.isDefined(openOrder.type);
            assert.isString(openOrder.type);
          });

          test(`market.outcomes[${i}].userOpenOrders[${j}].avgPrice`, () => {
            assert.isDefined(openOrder.avgPrice);
            assert.isObject(openOrder.avgPrice);
            assertFormattedNumber(openOrder.avgPrice, "openOrder.avgPrice");
          });

          test(`market.outcomes[${i}].userOpenOrders[${j}].unmatchedShares`, () => {
            assert.isDefined(openOrder.unmatchedShares);
            assert.isObject(openOrder.unmatchedShares);
            assertFormattedNumber(
              openOrder.unmatchedShares,
              "openOrder.unmatchedShares"
            );
          });
        });
      });
    });

    test("market.reportableOutcomes", () => {
      assertReportableOutcomes(market.reportableOutcomes);
    });

    const indeterminateItem =
      market.reportableOutcomes[market.reportableOutcomes.length - 1];
    test(
      "market.reportableOutcomes[market.reportableOutcomes.length - 1] (indeterminateItem)",
      () => {
        assert.isDefined(indeterminateItem);
        assert.isObject(indeterminateItem);
      }
    );

    test(
      "market.reportableOutcomes[market.reportableOutcomes.length - 1] (indeterminateItem.id)",
      () => {
        assert.isDefined(indeterminateItem.id);
        assert.isString(indeterminateItem.id);
      }
    );

    test(
      "market.reportableOutcomes[market.reportableOutcomes.length - 1] (indeterminateItem.name)",
      () => {
        assert.isDefined(indeterminateItem.name);
        assert.isString(indeterminateItem.name);
      }
    );

    const { tradeSummary } = market;
    test("market.tradeSummary", () => {
      assert.isDefined(tradeSummary);
      assert.isObject(tradeSummary);
    });

    test("market.tradeSummary.totalGas", () => {
      assert.isDefined(tradeSummary.totalGas);
      assertFormattedNumber(tradeSummary.totalGas, "tradeSummary.totalGas");
    });

    test("market.tradeSummary.hasUserEnoughFunds", () => {
      assert.isBoolean(tradeSummary.hasUserEnoughFunds);
    });

    const { tradeOrders } = tradeSummary;
    test("market.tradeSummary.tradeOrders", () => {
      assert.isDefined(tradeOrders);
      assert.isArray(tradeOrders);
    });

    tradeOrders.forEach((trade, i) => {
      test(`market.tradeSummary.tradeOrders${i}.shares`, () => {
        assert.isDefined(trade.shares);
        assert.isObject(trade.shares);
        assertFormattedNumber(trade.shares, "trade.shares");
      });

      test(`market.tradeSummary.tradeOrders${i}.limitPrice`, () => {
        assert.isDefined(trade.limitPrice);
        assert.isNumber(trade.limitPrice);
      });

      test(`market.tradeSummary.tradeOrders${i}.ether`, () => {
        assert.isDefined(trade.ether);
        assert.isObject(trade.ether);
        assertFormattedNumber(trade.ether, "trade.ether");
      });

      test(`market.tradeSummary.tradeOrders${i}.gas`, () => {
        assert.isDefined(trade.gas);
        assert.isObject(trade.gas);
      });
      test(`market.tradeSummary.tradeOrders${i}.gas.value`, () => {
        assert.isDefined(trade.gas.value);
        assert.isNumber(trade.gas.value);
      });

      test(`market.tradeSummary.tradeOrders${i}.data`, () => {
        assert.isDefined(trade.data);
        assert.isObject(trade.data);
      });

      test(`market.tradeSummary.tradeOrders${i}.data.marketId`, () => {
        assert.isDefined(trade.data.marketId);
        assert.isString(trade.data.marketId);
      });

      test(`market.tradeSummary.tradeOrders${i}.data.outcomeId`, () => {
        assert.isDefined(trade.data.outcomeId);
        assert.isString(trade.data.outcomeId);
      });

      test(`market.tradeSummary.tradeOrders${i}.description`, () => {
        assert.isDefined(trade.description);
        assert.isString(trade.description);
      });

      test(`market.tradeSummary.tradeOrders${i}.data.outcomeName`, () => {
        assert.isDefined(trade.data.outcomeName);
        assert.isString(trade.data.outcomeName);
      });

      test(`market.tradeSummary.tradeOrders${i}.data.avgPrice`, () => {
        assert.isDefined(trade.data.avgPrice);
        assert.isObject(trade.data.avgPrice);
        assertFormattedNumber(trade.data.avgPrice, "trade.data.avgPrice");
      });
    });

    // it('market.priceTimeSeries', () => {
    // assert.isDefined(market.priceTimeSeries)
    // assert.isArray(market.priceTimeSeries)
    // })

    test("market.userOpenOrdersSummary", () => {
      assert.isDefined(market.userOpenOrdersSummary);
      assert.isObject(market.userOpenOrdersSummary);
    });

    test("market.userOpenOrdersSummary.openOrdersCount", () => {
      assert.isDefined(market.userOpenOrdersSummary.openOrdersCount);
      assertFormattedNumber(
        market.userOpenOrdersSummary.openOrdersCount,
        "market.userOpenOrdersSummary.openOrdersCount"
      );
    });

    const { myPositionsSummary } = market;
    test("market.myPositionsSummary", () => {
      assert.isDefined(myPositionsSummary);
      assert.isObject(myPositionsSummary);
    });

    test("market.myPositionsSummary.numPositions", () => {
      assert.isDefined(myPositionsSummary.numPositions);
      assertFormattedNumber(
        myPositionsSummary.numPositions,
        "myPositionsSummary.numPositions"
      );
    });

    test("market.myPositionsSummary.qtyShares", () => {
      assert.isDefined(myPositionsSummary.qtyShares);
      assertFormattedNumber(
        myPositionsSummary.qtyShares,
        "myPositionsSummary.qtyShares"
      );
    });

    test("market.myPositionsSummary.purchasePrice", () => {
      assert.isDefined(myPositionsSummary.purchasePrice);
      assertFormattedNumber(
        myPositionsSummary.purchasePrice,
        "myPositionsSummary.purchasePrice"
      );
    });

    test("market.myPositionsSummary.realizedNet", () => {
      assert.isDefined(myPositionsSummary.realizedNet);
      assertFormattedNumber(
        myPositionsSummary.realizedNet,
        "myPositionsSummary.realizedNet"
      );
    });

    test("market.myPositionsSummary.unrealizedNet", () => {
      assert.isDefined(myPositionsSummary.unrealizedNet);
      assertFormattedNumber(
        myPositionsSummary.unrealizedNet,
        "myPositionsSummary.unrealizedNet"
      );
    });

    test("market.myPositionsSummary.totalNet", () => {
      assert.isDefined(myPositionsSummary.totalNet);
      assertFormattedNumber(
        myPositionsSummary.totalNet,
        "myPositionsSummary.totalNet"
      );
    });

    const { report } = market;
    test("market.report", () => {
      assert.isDefined(report);
      assert.isObject(report);
    });

    test("market.report.onSubmitReport", () => {
      assert.isDefined(report.onSubmitReport);
      assert.isFunction(report.onSubmitReport);
    });

    const { onSubmitPlaceTrade } = market;
    test("market.onSubmitPlaceTrade", () => {
      assert.isDefined(onSubmitPlaceTrade);
      assert.isFunction(onSubmitPlaceTrade);
    });
  });
}
