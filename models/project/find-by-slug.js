'use strict';

module.exports = (ProjectModel, projectSlug, done) => {
  ProjectModel.findOne({
    slug: projectSlug,
  })
    .then((doc) => {
      done(null, doc);
    })
    .catch((err) => {
      done(err);
    });
};
