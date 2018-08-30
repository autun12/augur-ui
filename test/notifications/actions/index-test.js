import * as updateNotifications from "modules/notifications/actions";
import * as notificationLevels from "src/modules/notifications/constants";

describe("modules/notifications/actions/update-notifications", () => {
  describe("addNotification", () => {
    test("should return nothing when the notifications param is null/undefined", () => {
      const actual = updateNotifications.addNotification();
      const expected = undefined;

      expect(actual).toBe(expected);
    });

    test("should return the expected object when a notification is passed in", () => {
      const actual = updateNotifications.addNotification({});

      const expected = {
        type: updateNotifications.ADD_NOTIFICATION,
        data: {
          notification: {
            level: notificationLevels.INFO,
            seen: false
          }
        }
      };

      expect(actual).toEqual(expected);
    });

    test("should default notification level to the 'INFO' constant", () => {
      const actual = updateNotifications.addNotification({});
      expect(actual.data.notification.level).toEqual(notificationLevels.INFO);
    });

    test("should override the default notification level with the value passed in the notification object param", () => {
      const actual = updateNotifications.addNotification({
        level: notificationLevels.CRITICAL
      });
      expect(actual.data.notification.level).toEqual(
        notificationLevels.CRITICAL
      );
    });
  });

  describe("removeNotification", () => {
    test("should return the expected object", () => {
      const actual = updateNotifications.removeNotification(1);

      const expected = {
        type: updateNotifications.REMOVE_NOTIFICATION,
        data: 1
      };

      expect(actual).toEqual(expected);
    });
  });

  describe("updateNotification", () => {
    test("should should return the expected object", () => {
      const actual = updateNotifications.updateNotification(1, {
        testing: "test"
      });

      const expected = {
        type: updateNotifications.UPDATE_NOTIFICATION,
        data: {
          id: 1,
          notification: {
            testing: "test"
          }
        }
      };

      expect(actual).toEqual(expected);
    });
  });

  describe("clearNotifications", () => {
    test("should return the expected object", () => {
      const actual = updateNotifications.clearNotifications();

      const expected = {
        type: updateNotifications.CLEAR_NOTIFICATIONS,
        data: {
          level: notificationLevels.INFO
        }
      };
      expect(actual).toEqual(expected);
    });

    describe("notificationLevel", () => {
      test("should default to the 'INFO' constant", () => {
        const actual = updateNotifications.clearNotifications();
        expect(actual.data.level).toEqual(notificationLevels.INFO);
      });

      test("should pass notificationLevel", () => {
        const actual = updateNotifications.clearNotifications(
          notificationLevels.CRITICAL
        );
        expect(actual.data.level).toEqual(notificationLevels.CRITICAL);
      });
    });
  });
});
