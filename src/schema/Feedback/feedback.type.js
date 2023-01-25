const { gql } = require("graphql-modules");

const Feedback = gql`
  scalar Date
  scalar JSON
  scalar JSONObject

  type Media {
    id: Int
    url: String
    type: MEDIA_TYPES
    Feedbacks: Feedback
    createdAt: Date
    updatedAt: Date
  }

  type FeedbackType {
    id: Int
    name: String
    createdAt: Date
    updatedAt: Date
  }

  type Feedback {
    id: Int
    title: String
    message: String
    Media: [Media]
    feedbackTypeId: Int
    feedbackType: FeedbackType
    Comment: [Comment]
    userId: Int
    User: User
    FeedBackStatus: FeedBackStatus
    createdAt: Date
    updatedAt: Date
  }

  type FeedbackResponse {
    status: Boolean
    message: String
    data: Feedback
    error: String
  }

  type FeedbackArrayResponse {
    status: Boolean
    message: String
    data: [Feedback]
    error: String
  }

  type FeedbackTypeResponse {
    status: Boolean
    message: String
    data: FeedbackType
    error: String
  }

  type FeedbackTypeArrayResponse {
    status: Boolean
    message: String
    data: [FeedbackType]
    error: String
  }

  input MediaInput {
    url: String!
    type: MEDIA_TYPES!
  }
  
  input getFeedbackInput {
    feedbackTypeId: Int,
    userId: Int,
  }
  type Query {
    getAllFeedbacks(where: getFeedbackInput): FeedbackArrayResponse
    getFeedbackById(id: Int!): FeedbackResponse
    getAllFeedbackTypes: FeedbackTypeArrayResponse
    getFeedbackTypeById(id: Int!): FeedbackTypeResponse
  }

  type Mutation {
    addNewFeedback(
      title: String!
      message: String!
      feedbackTypeId: Int!
      userId: Int!
      media: [MediaInput]
    ): FeedbackResponse
    updateFeedback(id: Int!, title: String, message: String, feedbackTypeId: Int, FeedBackStatus: FeedBackStatus): FeedbackResponse
    deleteFeedback(id: Int!): FeedbackResponse
    addFeedbackType(
      name: String!
    ): FeedbackTypeResponse
    updateFeedbackType(id: Int!, name: String): FeedbackTypeResponse
    deleteFeedbackType(id: Int!): FeedbackTypeResponse
  }

  enum MEDIA_TYPES {
    IMAGE
    VIDEO
    ATTACHMENT
  }

enum FeedBackStatus {
  OPEN
  IN_PROGRESS
  CLOSED
}

`;

module.exports = {
  Feedback,
};
