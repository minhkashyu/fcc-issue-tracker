const Project = require('../../models/project/index.js');
const Issue = require('../../models/issue/index.js');

// * View issues on a project: GET request to `/api/issues/{project}`
// * View issues on a project with one filter: GET request to `/api/issues/{project}`
// * View issues on a project with multiple filters: GET request to `/api/issues/{project}`
module.exports = (req, res) => {
  let projectSlug = req.params.project;
  let issueId = req.query._id || '';
  let issueTitle = req.query.issue_title || '';
  let issueText = req.query.issue_text || '';
  let createdBy = req.query.created_by || '';
  let assignedTo = req.query.assigned_to || '';
  let statusText = req.query.status_text || '';
  let open = undefined;
  if (req.query.open !== undefined) {
    open = (req.query.open === 'true');
  }

  Project.findBySlug(projectSlug, (error, project) => {
    if (error || !project) {
      return res.json([]);
    }

    let objCriteria = {
      project: project._id,
    };
    if (issueId) {
      objCriteria._id = issueId;
    }
    if (issueTitle) {
      objCriteria.issue_title = issueTitle;
    }
    if (issueText) {
      objCriteria.issue_text = issueText;
    }
    if (createdBy) {
      objCriteria.created_by = createdBy;
    }
    if (assignedTo) {
      objCriteria.assigned_to = assignedTo;
    }
    if (statusText) {
      objCriteria.status_text = statusText;
    }
    if (open !== undefined) {
      objCriteria.open = open;
    }

    Issue.fetchIssues(objCriteria, null, (error, issues) => {
      if (error) {
        return res.json({
          error: error.message
        });
      }

      return res.json(issues);
    });
  });
};
