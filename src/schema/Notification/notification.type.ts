const { gql } = require("graphql-modules");

const Notification = gql`
  scalar Date
  scalar JSON
  scalar JSONObject

  type Notification {
    id: Int
    title: String
    message: String
    data: JSON
    type: NOTIFICATION_TYPES
    senderId: Int
    sender: User
    # receiverId: Int
    # receiver: User
    receivers: [Int]
    createdAt: Date
    updatedAt: Date
  }

  type NotificationResponse {
    status: Boolean
    message: String
    data: Notification
    error: String
  }

  type NotificationArrayResponse {
    status: Boolean
    message: String
    data: [Notification]
    error: String
  }
  input GetNotificationInput {
    userId: Int
  }
  type Query {
    getAllNotifications(where: GetNotificationInput): NotificationArrayResponse
    getNotificationById(id: Int!): NotificationResponse
  }

  # type Mutation {
  # addNewNotification(
  #   title: String!
  #   message: String!
  #   senderId: Int!
  # ): NotificationResponse
  # updateNotification(
  #   id: Int!
  #   title: String
  #   message: String
  # ): NotificationResponse
  # deleteNotification(id: Int!): NotificationResponse
  # }

  enum NOTIFICATION_TYPES {
    FEEDBACK
    MESSAGE
    COMMENT
    NOTICE
  }
`;

module.exports = {
  Notification,
};
