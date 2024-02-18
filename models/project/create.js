'use strict';

module.exports = (ProjectModel, projectName, projectSlug, done) => {
  let projectDocument = new ProjectModel({
    name: projectName,
    slug: projectSlug,
  });

  projectDocument.save()
    .then((doc) => {
      done(null, doc);
    })
    .catch((err) => {
      done(err);
    });
};
