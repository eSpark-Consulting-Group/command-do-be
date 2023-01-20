const { createModule } = require('graphql-modules');
const { CommentResolver } = require('./comment.resolver');
const { Comment } = require('./comment.type');

const CommentModule = createModule({
  id: 'comment-module',
  dirname: __dirname,
  typeDefs: [Comment],
  resolvers: [CommentResolver]
});

module.exports = {
  CommentModule
}
