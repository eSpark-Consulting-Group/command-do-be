require("dotenv").config();
const admin = require("firebase-admin");
const { prisma } = require("../database.js");
const {
  createError,
  createResponse,
  getFcmTokensByRole,
} = require("../utils/helperFunctions.js");

const Notification = {
  async send(usertokens, data, title, description, type, userIds) {
    // console.log("usertokens, data, title, description", usertokens, data, title, description)
    const message = {
      notification: { title: title, body: description },
      data: { data: JSON.stringify(data) },
      tokens: usertokens,
    };
    try {
      this.addNewNotification(data, title, description, type, userIds);
      const result = await admin.messaging().sendMulticast(message);
      console.log("result SendNotificationToMutliUsers", message);
    } catch (error) {
      console.log("error  SendNotificationToMutliUsers", error, message);
    }
  },

  async getAllNotifications(data) {
    try {
      const responseData = await prisma.notification.findMany({
        where: data?.where
          ? {
              receivers: {
                has: data?.where?.userId,
              },
            }
          : {},
        include: {
          receiver: true,
          sender: true,
        },
      });
      return createResponse(responseData, true, "All Notifications");
    } catch (error) {
      return createError(401, error);
    }
  },

  async getNotificationById(data) {
    try {
      const responseData = await prisma.notification.findUnique({
        where: { id: data?.id },
        include: {
          receiver: true,
          sender: true,
        },
      });
      if (!responseData) return createError(404, "Notification not found");
      return createResponse(responseData, true, "Notifications By Id");
    } catch (error) {
      return createError(401, error);
    }
  },

  async addNewNotification(data, title, message, type, userIds) {
    if (data.senderId) {
      const userExist = await prisma.user.findUnique({
        where: { id: data.senderId },
      });
      if (!userExist) return createError("404", "User Not Found!");
    }
    try {
      const notification = await prisma.notification.create({
        data: {
          title: title ?? "",
          message: message ?? "",
          senderId: data?.senderId,
          receiverId: data?.receiverId,
          data: data,
          type: type ?? "FEEDBACK",
          receivers: userIds ?? [],
        },
      });

      if (notification.id) {
        return createResponse(notification, true, "New Notification Added");
      }
      return createError(
        200,
        "An Error Occur",
        false,
        null,
        "Something went wrong"
      );
    } catch (error) {
      return createError(401, error);
    }
  },

  async updateNotification(data) {
    try {
      const notification = await prisma.notification.findUnique({
        where: { id: data?.id },
      });
      if (!notification) return createError("404", "Notification Not Found!");
      if (notification.id) {
        const responseData = await prisma.notification.update({
          where: { id: notification.id },
          data,
        });
        return createResponse(
          responseData,
          true,
          "Notification Update Successfully"
        );
      }
      return createError(
        200,
        "An Error Occur",
        false,
        null,
        "Something went wrong"
      );
    } catch (error) {
      return createError(401, error);
    }
  },

  async deleteNotification(data) {
    try {
      const notification = await prisma.notification.findUnique({
        where: { id: data?.id },
      });
      if (!notification) return createError("404", "Notification Not Found!");
      if (notification.id) {
        const responseData = await prisma.notification.delete({
          where: { id: notification.id },
        });
        return createResponse(responseData, true, "Notification deleted");
      }
      return createError(
        200,
        "An Error Occur",
        false,
        null,
        "Something went wrong"
      );
    } catch (error) {
      return createError(401, error);
    }
  },
};

module.exports = Notification;
