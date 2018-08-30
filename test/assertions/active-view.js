export default function(activeView) {
  expect(activeView).toBeDefined();
  expect(typeof activeView).toBe("string");
}
