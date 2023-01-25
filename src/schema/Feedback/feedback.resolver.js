const FeedbackServices = require("../../services/FeedbackServices");
const { createError } = require("../../utils/helperFunctions");

const FeedbackResolver = {
  Query: {
    getAllFeedbacks: async (args, req, context) => {
      try {
        const responseData = await FeedbackServices.getAllFeedbacks(req);
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },

    getFeedbackById: async (args, req, context) => {
      try {
        const responseData = await FeedbackServices.getFeedbackById(req);
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },

    getAllFeedbackTypes: async (args, req, context) => {
      try {
        const responseData = await FeedbackServices.getAllFeedbackTypes();
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },

    getFeedbackTypeById: async (args, req, context) => {
      try {
        const responseData = await FeedbackServices.getFeedbackTypeById(req);
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },
  },
  Mutation: {
    addNewFeedback: async (args, req, context) => {
      try {
        const responseData = await FeedbackServices.addNewFeedback(req);
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },

    updateFeedback: async (args, req, context) => {
      try {
        const responseData = await FeedbackServices.updateFeedback(req);
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },

    deleteFeedback: async (args, req, context) => {
      try {
        const responseData = await FeedbackServices.deleteFeedback(req);
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },

    addFeedbackType: async (args, req, context) => {
      try {
        const responseData = await FeedbackServices.addFeedbackType(req);
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },

    updateFeedbackType: async (args, req, context) => {
      try {
        const responseData = await FeedbackServices.updateFeedbackType(req);
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },

    deleteFeedbackType: async (args, req, context) => {
      try {
        const responseData = await FeedbackServices.deleteFeedbackType(req);
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },
  },
};

module.exports = {
  FeedbackResolver,
};
