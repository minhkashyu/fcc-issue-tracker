const Project = require('../../models/project/index.js');

module.exports = (req, res) => {
  let projectName = req.body.project_name || '';

  if (!projectName) {
    return res.json({
      error: 'required field(s) missing',
    });
  }

  // Convert the project name to a lower case slug by replacing spaces with hyphens,
  // removing any non-word characters except hyphens, condensing multiple hyphens
  // into a single hyphen, and removing leading and trailing hyphens.
  let projectSlug = projectName.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

  if (projectSlug.length > 50) {
    projectSlug = projectSlug.substring(0, 50);
  }

  Project.findBySlug(projectSlug, (error, doc) => {
    if (error) {
      return res.json({
        error: error.message
      });
    }

    // if the slug is not unique, append a timestamp to the slug
    if (doc) {
      projectSlug = `${projectSlug}-${Date.now()}`;
    }

    Project.createAndSaveProject(projectName, projectSlug, (error, doc) => {
      if (error) {
        return res.json({
          error: error.message
        });
      }

      return res.json({
        result: 'successfully created',
        _id: doc._id,
      });
    });
  });
};
