const Project = require('../../models/project/index.js');
const Issue = require('../../models/issue/index.js');

// * Create an issue with every field: POST request to `/api/issues/{project}`
// * Create an issue with only required fields: POST request to `/api/issues/{project}`
// * Create an issue with missing required fields: POST request to `/api/issues/{project}`
module.exports = (req, res) => {
  let project = req.params.project;
  let issueTitle = req.body.issue_title || '';
  let issueText = req.body.issue_text || '';
  let createdBy = req.body.created_by || '';
  let assignedTo = req.body.assigned_to || '';
  let statusText = req.body.status_text || '';

  if (!issueTitle || !issueText || !createdBy) {
    return res.json({
      error: 'required field(s) missing',
    });
  }

  Project.findBySlug(project, (error, project) => {
    if (error) {
      return res.json({
        error: error.message
      });
    }

    if (!project) {
      return res.json({
        error: 'could not create new issue',
      });
    }

    Issue.createAndSaveIssue({
      project: project._id,
      issue_title: issueTitle,
      issue_text: issueText,
      created_by: createdBy,
      assigned_to: assignedTo,
      status_text: statusText,
    }, (error, doc) => {
      if (error) {
        return res.json({
          error: error.message
        });
      }

      return res.json(doc);
    });
  });
};
