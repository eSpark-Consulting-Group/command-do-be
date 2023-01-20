require("dotenv").config();
const { prisma } = require("../database.js");
const {
  createError,
  createResponse,
  getFcmTokensByRole,
  getIdsByRole,
} = require("../utils/helperFunctions.js");
const NotificationServices = require("./NotificationServices");

const Feedback = {
  async getAllFeedbacks() {
    try {
      const responseData = await prisma.feedback.findMany({
        include: {
          Media: true,
          feedbackType: true,
          User: true,
        },
      });
      return createResponse(responseData, true, "All Feedbacks");
    } catch (error) {
      return createError(401, error);
    }
  },

  async getFeedbackById(data) {
    try {
      const responseData = await prisma.feedback.findUnique({
        where: { id: data?.id },
        include: {
          Media: true,
          feedbackType: true,
          User: true,
        },
      });
      if (!responseData) return createError(404, "Feedback not found");
      return createResponse(responseData, true, "Feedbacks By Id");
    } catch (error) {
      return createError(401, error);
    }
  },

  async getAllFeedbackTypes() {
    try {
      const responseData = await prisma.feedbackType.findMany();
      return createResponse(responseData, true, "All Feedback Types");
    } catch (error) {
      return createError(401, error);
    }
  },

  async getFeedbackTypeById(data) {
    try {
      const responseData = await prisma.feedbackType.findUnique({
        where: { id: data?.id },
      });
      if (!responseData) return createError(404, "Feedback Type not found");
      return createResponse(responseData, true, "Feedback Type By Id");
    } catch (error) {
      return createError(401, error);
    }
  },

  async addFeedbackMedia(id, data) {
    for (const media of data) {
      const MediaData = {
        feedbackId: id,
        url: media.url,
        type: media.type,
      };
      const addMediaData = await prisma.media.create({
        data: MediaData,
      });
    }
  },

  async addNewFeedback(data) {
    const userExist = await prisma.user.findUnique({
      where: { id: data.userId },
    });
    if (!userExist) return createError("404", "User Not Found!");

    const feedbackTypeExist = await prisma.feedbackType.findUnique({
      where: { id: data.feedbackTypeId },
    });
    if (!feedbackTypeExist)
      return createError("404", "This Feedback Type is Not Found!");

    const media = [...data?.media];
    delete data?.media;
    try {
      const feedback = await prisma.feedback.create({
        data: data,
        include: {
          User: true,
        },
      });

      if (feedback.id) {
        const responseMedia = await this.addFeedbackMedia(feedback.id, media);
        const responseData = await prisma.feedback.findUnique({
          where: { id: feedback.id },
        });
        NotificationServices.send(
          await getFcmTokensByRole("ADMIN"),
          { ...feedback, senderId: feedback?.userId },
          data?.title,
          data?.message,
          "FEEDBACK",
          await getIdsByRole("ADMIN"),
        );
        return createResponse(responseData, true, "New Feedback Added");
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

  async updateFeedback(data) {
    try {
      const feedback = await prisma.feedback.findUnique({
        where: { id: data?.id },
      });
      if (!feedback) return createError("404", "Feedback Not Found!");
      if (feedback.id) {
        const responseData = await prisma.feedback.update({
          where: { id: feedback.id },
          data,
          include: {
            User: true,
          },
        });
        if (data?.FeedBackStatus && responseData?.User?.fcmToken) {
          NotificationServices.send(
            [responseData?.User?.fcmToken],
            { ...responseData, senderId: responseData?.userId },
            responseData?.title,
            `Status of this ticket has been updated to ${data?.FeedBackStatus?.replace('_', ' ')?.toUpperCase()}`,
            'FEEDBACK',
            [responseData?.User?.id],
          );
        }
        return createResponse(
          responseData,
          true,
          "Feedback Update Successfully"
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

  async deleteFeedback(data) {
    try {
      const feedback = await prisma.feedback.findUnique({
        where: { id: data?.id },
      });
      if (!feedback) return createError("404", "Feedback Not Found!");
      if (feedback.id) {
        const responseData = await prisma.feedback.delete({
          where: { id: feedback.id },
        });
        return createResponse(responseData, true, "Feedback deleted");
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

  async addFeedbackType(data) {
    try {
      const feedback = await prisma.feedbackType.create({
        data: data,
      });
      return createResponse(feedback, true, "New FeedbackType Added");
    } catch (error) {
      return createError(401, error);
    }
  },

  async updateFeedbackType(data) {
    try {
      const feedback = await prisma.feedbackType.findUnique({
        where: { id: data?.id },
      });
      if (!feedback) return createError("404", "FeedbackType Not Found!");
      if (feedback.id) {
        const responseData = await prisma.feedbackType.update({
          where: { id: feedback.id },
          data,
        });
        return createResponse(
          responseData,
          true,
          "FeedbackType Update Successfully"
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

  async deleteFeedbackType(data) {
    try {
      const feedback = await prisma.feedbackType.findUnique({
        where: { id: data?.id },
      });
      if (!feedback) return createError("404", "FeedbackType Not Found!");
      if (feedback.id) {
        const responseData = await prisma.feedbackType.delete({
          where: { id: feedback.id },
        });
        return createResponse(responseData, true, "FeedbackType deleted");
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

module.exports = Feedback;
