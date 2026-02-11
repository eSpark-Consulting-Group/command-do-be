const { gql } = require("graphql-modules");

const Comment = gql`
  scalar Date

  type Comment {
    id: Int
    comment: String
    userId: Int
    User: User
    parentId: Int
    parentComment: Comment
    replies: [Comment]
    feedbackId: Int
    Feedback: Feedback
    createdAt: Date
    updatedAt: Date
  }

  type CommentResponse {
    status: Boolean
    message: String
    data: Comment
    error: String
  }

  type CommentArrayResponse {
    status: Boolean
    message: String
    data: [Comment]
    error: String
  }

  input GetCommentInput {
    feedbackId: Int
  }

  type Query {
    getAllComments(where: GetCommentInput): CommentArrayResponse
    getCommentById(id: Int!): CommentResponse
  }

  type Mutation {
    addNewComment(
      comment: String!
      parentId: Int
      feedbackId: Int!
      userId: Int!
    ): CommentResponse
    updateComment(id: Int!, comment: String): CommentResponse
    deleteComment(id: Int!): CommentResponse
  }

  enum MEDIA_TYPES {
    IMAGE
    VIDEO
    ATTACHMENT
  }
`;

module.exports = {
  Comment,
};
