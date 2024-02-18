const Project = require('../../models/project/index.js');
const Issue = require('../../models/issue/index.js');

// * Delete an issue: DELETE request to `/api/issues/{project}`
// * Delete an issue with an invalid `_id`: DELETE request to `/api/issues/{project}`
// * Delete an issue with missing `_id`: DELETE request to `/api/issues/{project}`
module.exports = (req, res) => {
  let project = req.params.project;
  let issueId = req.body._id || '';

  if (!issueId) {
    return res.json({
      error: 'missing _id',
    });
  }

  Project.findBySlug(project, (error, project) => {
    if (error || !project) {
      return res.json({
        error: 'could not delete',
        _id: issueId
      });
    }

    Issue.getIssue(issueId, (error, issue) => {
      if (error || !issue) {
        return res.json({
          error: 'could not delete',
          _id: issueId
        });
      }

      Issue.deleteIssue(issueId, (error, doc) => {
        if (error) {
          return res.json({
            error: 'could not delete',
            _id: issueId
          });
        }

        return res.json({
          result: 'successfully deleted',
          _id: doc._id,
        });
      });
    });
  });
};
