require("dotenv").config();
const admin = require("firebase-admin");
const { prisma } = require("../database.js");
const {
  createError,
  createResponse,
  getFcmTokensByRole,
} = require("../utils/helperFunctions.js");

const Notification = {
  async send(usertokens, data, title, description) {
    console.log("usertokens, data, title, description", usertokens, data, title, description)
    const message = {
      notification: { title: title, body: description },
      data: data,
      tokens: usertokens,
    };
    try {
      const result = await admin.messaging().sendMulticast(message);
      console.log("result SendNotificationToMutliUsers", result);
    } catch (error) {
      console.log("error  SendNotificationToMutliUsers", error);
    }
  },

  async getAllNotifications() {
    try {
      const responseData = await prisma.notification.findMany({
        include: {
          receiver: true,
          sender: true,
        }
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
        }
      });
      if (!responseData) return createError(404, "Notification not found");
      return createResponse(responseData, true, "Notifications By Id");
    } catch (error) {
      return createError(401, error);
    }
  },

  async addNotificationMedia(id, data) {
    for (const media of data) {
      const MediaData = {
        notificationId: id,
        url: media.url,
        type: media.type,
      };
      const addMediaData = await prisma.media.create({
        data: MediaData,
      });
    }
  },

  async addNewNotification(data) {
    const userExist = await prisma.user.findUnique({
      where: {id: data.senderId},
    })
    if(!userExist) return createError("404", "User Not Found!");
    const media = [...data?.media]
    delete data?.media
    try {
      const notification = await prisma.notification.create({
        data: data,
      });

      if (notification.id) {
        const responseMedia = await this.addNotificationMedia(notification.id, media)
        const responseData = await prisma.notification.findUnique({
          where: { id: notification.id },
        });
        Notification.send(
          await getFcmTokensByRole("ADMIN"),
          {},
          data?.title,
          data?.message
        );
        return createResponse(responseData, true, "New Notification Added");
      }

      return createError(200, "An Error Occur", false, null, ["Occur"]);
    } catch (error) {
      return createError(401, error);
    }
  },

  async updateNotification (data) {
    try {
        const notification = await prisma.notification.findUnique({
          where: { id: data?.id },
        });
        if (!notification) return createError("404", "Notification Not Found!");
        if (notification.id) {
          const responseData = await prisma.notification.update({
            where: { id: notification.id },
            data
          });
          return createResponse(responseData, true, "Notification Update Successfully");
        }
        return createError(200, "An Error Occur", false, null, ["Occur"]);
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
      return createError(200, "An Error Occur", false, null, ["Occur"]);
    } catch (error) {
      return createError(401, error);
    }
  },
};


module.exports = Notification;
