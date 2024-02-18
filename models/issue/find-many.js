'use strict';

module.exports = (IssueModel, objCriteria, limit, done) => {
  let query = IssueModel.find(objCriteria);
  if (limit) {
    query.limit(limit);
  }

  query.sort({created_on: 1})
    .then((data) => {
      done(null, data);
    })
    .catch((err) => {
      done(err);
    });
};
