export default function(selectedUserOpenOrdersGroup) {
  describe("selectedUserOpenOrdersGroup", () => {
    test("should exist", () => {
      assert.isDefined(
        selectedUserOpenOrdersGroup,
        `selectedUserOpenOrdersGroup is empty.`
      );
    });

    test("should be object", () => {
      assert.isObject(
        selectedUserOpenOrdersGroup,
        `selectedUserOpenOrdersGroup is not object.`
      );
    });

    describe("selectedUserOpenOrdersGroupId", () => {
      test("should exist", () => {
        assert.isDefined(
          selectedUserOpenOrdersGroup.selectedUserOpenOrdersGroupId,
          `selectedUserOpenOrdersGroupId is not defined.`
        );
      });
    });

    describe("updateSelectedUserOpenOrdersGroup", () => {
      test("should be function", () => {
        assert.isFunction(
          selectedUserOpenOrdersGroup.updateSelectedUserOpenOrdersGroup,
          `updateSelectedUserOpenOrdersGroup is not function.`
        );
      });
    });
  });
}
