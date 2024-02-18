'use strict';

module.exports = (IssueModel, issueId, done) => {
  IssueModel.findByIdAndDelete(issueId)
    .then((doc) => {
      done(null, doc);
    })
    .catch((err) => {
      done(err);
    });
};
