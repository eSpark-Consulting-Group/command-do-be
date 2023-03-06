const { createModule } = require('graphql-modules');
const {FeedbackResolver } = require('./feedback.resolver');
const {Feedback } = require('./feedback.type');

const FeedbackModule = createModule({
  id: 'feedback-module',
  dirname: __dirname,
  typeDefs: [Feedback],
  resolvers: [FeedbackResolver]
});

module.exports = {
  FeedbackModule
}
