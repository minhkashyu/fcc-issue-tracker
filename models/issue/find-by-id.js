'use strict';

module.exports = (IssueModel, issueId, done) => {
  IssueModel.findById(issueId)
    .then((doc) => {
      done(null, doc);
    })
    .catch((err) => {
      done(err);
    });
};
