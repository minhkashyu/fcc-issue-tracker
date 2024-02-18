'use strict';

module.exports = (IssueModel, issueId, obj, done) => {
  IssueModel.findByIdAndUpdate(issueId, obj)
    .then((doc) => {
      done(null, doc);
    })
    .catch((err) => {
      done(err);
    });
};
