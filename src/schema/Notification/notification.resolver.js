const NotificationServices = require("../../services/NotificationServices");
const { createError } = require("../../utils/helperFunctions");

const NotificationResolver = {
  Query: {
    getAllNotifications: async (args, req, context) => {
      try {
        const responseData = await NotificationServices.getAllNotifications();
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },

    getNotificationById: async (args, req, context) => {
      try {
        const responseData = await NotificationServices.getNotificationById(req);
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },
  },
  Mutation: {
    addNewNotification: async (args, req, context) => {
      try {
        const responseData = await NotificationServices.addNewNotification(req);
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },

    updateNotification: async (args, req, context) => {
      try {
        const responseData = await NotificationServices.updateNotification(req);
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },

    deleteNotification: async (args, req, context) => {
      try {
        const responseData = await NotificationServices.deleteNotification(req);
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },
  },
};

module.exports = {
  NotificationResolver,
};
