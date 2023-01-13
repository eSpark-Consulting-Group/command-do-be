const { gql } = require("graphql-modules");

const Notification = gql`
  scalar Date
  scalar JSON
  scalar JSONObject

  type Media {
    id: Int
    url: String
    type: MEDIA_TYPES
    Notifications: Notification
    createdAt: Date
    updatedAt: Date
  }

  type Notification {
    id: Int
    title: String
    message: String
    Media: [Media]
    data: JSON
    type: NOTIFICATION_TYPES
    senderId: Int
    sender: User
    receiverId: Int
    receiver: User
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

  input MediaInput {
    url: String!
    type: MEDIA_TYPES!
  }

  type Query {
    getAllNotifications: NotificationArrayResponse
    getNotificationById(id: Int!): NotificationResponse
  }

  type Mutation {
    addNewNotification(
      title: String!
      message: String!
      senderId: Int!
      media: [MediaInput]
    ): NotificationResponse
    updateNotification(
      id: Int!
      title: String
      message: String
    ): NotificationResponse
    deleteNotification(id: Int!): NotificationResponse
  }

  enum MEDIA_TYPES {
    IMAGE
    VIDEO
    ATTACHMENT
  }

  enum NOTIFICATION_TYPES {
    FEEDBACK
    MESSAGE
  }
`;

module.exports = {
  Notification,
};
