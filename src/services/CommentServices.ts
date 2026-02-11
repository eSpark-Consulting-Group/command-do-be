require("dotenv").config();
const { prisma } = require("../database.js");
const {
  createError,
  createResponse,
  getFcmTokensByRole,
} = require("../utils/helperFunctions.js");
const NotificationServices = require("./NotificationServices");

const Comment = {
  async getAllComments(data) {
    try {
      const responseData = await prisma.comment.findMany({
        where: {
          parentId: null,
          feedbackId: data?.where?.feedbackId ?? undefined,
        },
        include: {
          User: true,
          replies: {
            include: {
              parentComment: true,
              User: true
            }
          },
        },
      });
      return createResponse(responseData, true, "All Comments");
    } catch (error) {
      return createError(401, error);
    }
  },

  async getCommentById(data) {
    try {
      const responseData = await prisma.comment.findUnique({
        where: { id: data?.id },
        include: {
          User: true,
          replies: true,
        },
      });
      if (!responseData) return createError(404, "Comment not found");
      return createResponse(responseData, true, "Comments By Id");
    } catch (error) {
      return createError(401, error);
    }
  },

  async addNewComment(data) {
    const userExist = await prisma.user.findUnique({
      where: { id: data.userId },
    });
    if (!userExist) return createError("404", "User Not Found!");

    try {
      const comment = await prisma.comment.create({
        data: data,
      });

      if (comment.id) {
        const responseData = await prisma.comment.findUnique({
          where: { id: comment.id },
          include: {
            Feedback: true,
            User: true,
          },
        });
        console.log("data?.parentId", data?.parentId, Boolean(data?.parentId));
        const users = await prisma.user.findMany({
          where: Boolean(data?.parentId)
            ? {
                Comment: {
                  some: {
                    OR: [
                      {
                        id: data?.parentId,
                      },
                      {
                        parentId: data?.parentId,
                      },
                    ],
                  },
                },
                NOT: {
                  id: data?.userId,
                },
              }
            : {
                OR: [
                  {
                    Comment: {
                      some: {
                        feedbackId: responseData.Feedback.id,
                      },
                    },
                  },
                  {
                    Feedback: {
                      some: {
                        userId: responseData.Feedback.userId,
                      },
                    },
                  },
                ],
                fcmToken: { not: "" },
                NOT: {
                  id: responseData.User.id,
                },
              },
          select: {
            fcmToken: true,
            id: true
          },
        });
        NotificationServices.send(
          users.map((val) => val?.fcmToken),
          { ...comment, senderId: comment?.userId },
          responseData?.Feedback.title,
          `${responseData.User.firstName + " " + responseData.User.lastName} ${
            Boolean(data?.parentId)
              ? "Replied on a comment that you are following!"
              : "Commented on this feedback"
          }`,
          "COMMENT",
          users.map((val) => val?.id)
        );
        return createResponse(responseData, true, "New Comment Added");
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

  async updateComment(data) {
    try {
      const comment = await prisma.comment.findUnique({
        where: { id: data?.id },
      });
      if (!comment) return createError("404", "Comment Not Found!");
      if (comment.id) {
        const responseData = await prisma.comment.update({
          where: { id: comment.id },
          data,
        });
        return createResponse(
          responseData,
          true,
          "Comment Update Successfully"
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

  async deleteComment(data) {
    try {
      const comment = await prisma.comment.findUnique({
        where: { id: data?.id },
      });
      if (!comment) return createError("404", "Comment Not Found!");
      if (comment.id) {
        const responseData = await prisma.comment.delete({
          where: { id: comment.id },
        });
        return createResponse(responseData, true, "Comment deleted");
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

module.exports = Comment;
