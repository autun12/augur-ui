export default function(transactionsTotals) {
  expect(typeof transactionsTotals).toBe("object");

  expect(typeof transactionsTotals.title).toBe("string");
  expect(typeof transactionsTotals.shortTitle).toBe("string");

  expect(typeof transactionsTotals.numWorking).toBe("number");
  expect(typeof transactionsTotals.numPending).toBe("number");
  expect(typeof transactionsTotals.numComplete).toBe("number");
  expect(typeof transactionsTotals.numWorkingAndPending).toBe("number");
  expect(typeof transactionsTotals.numTotal).toBe("number");
}
