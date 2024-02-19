'use strict';

module.exports = (ProjectModel, projectSlug, done) => {
  ProjectModel.findOneAndUpdate(
    {slug: projectSlug},
    {name: projectSlug},
    {
      new: true, // return new doc if one is upserted
      upsert: true, // insert the document if it does not exist
    }
  )
    .then((doc) => {
      done(null, doc);
    })
    .catch((err) => {
      done(err);
    });
};
