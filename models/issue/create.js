'use strict';

module.exports = (IssueModel, obj, done) => {
  let issueDocument = new IssueModel(obj);

  issueDocument.save()
    .then((doc) => {
      done(null, doc);
    })
    .catch((err) => {
      done(err);
    });
};
