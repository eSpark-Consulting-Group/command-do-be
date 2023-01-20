const CommentServices = require("../../services/CommentServices");
const { createError } = require("../../utils/helperFunctions");

const CommentResolver = {
  Query: {
    getAllComments: async (args, req, context) => {
      try {
        const responseData = await CommentServices.getAllComments();
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },

    getCommentById: async (args, req, context) => {
      try {
        const responseData = await CommentServices.getCommentById(req);
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },
  },
  Mutation: {
    addNewComment: async (args, req, context) => {
      try {
        const responseData = await CommentServices.addNewComment(req);
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },

    updateComment: async (args, req, context) => {
      try {
        const responseData = await CommentServices.updateComment(req);
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },

    deleteComment: async (args, req, context) => {
      try {
        const responseData = await CommentServices.deleteComment(req);
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },
  },
};

module.exports = {
  CommentResolver,
};
