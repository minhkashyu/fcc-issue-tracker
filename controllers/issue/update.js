const Project = require('../../models/project/index.js');
const Issue = require('../../models/issue/index.js');

// * Update one field on an issue: PUT request to `/api/issues/{project}`
// * Update multiple fields on an issue: PUT request to `/api/issues/{project}`
// * Update an issue with missing `_id`: PUT request to `/api/issues/{project}`
// * Update an issue with no fields to update: PUT request to `/api/issues/{project}`
// * Update an issue with an invalid `_id`: PUT request to `/api/issues/{project}`
module.exports = (req, res) => {
  let projectSlug = req.params.project;
  let issueId = req.body._id || '';
  let issueTitle = undefined;
  if (req.body.issue_title !== undefined) {
    issueTitle = req.body.issue_title;
  }
  let issueText = undefined;
  if (req.body.issue_text !== undefined) {
    issueText = req.body.issue_text;
  }
  let createdBy = undefined;
  if (req.body.created_by !== undefined) {
    createdBy = req.body.created_by;
  }
  let assignedTo = undefined;
  if (req.body.assigned_to !== undefined) {
    assignedTo = req.body.assigned_to;
  }
  let statusText = undefined;
  if (req.body.status_text !== undefined) {
    statusText = req.body.status_text;
  }
  let open = undefined;
  if (req.body.open !== undefined) {
    open = (req.body.open === 'true');
  }

  if (!issueId) {
    return res.json({
      error: 'missing _id',
    });
  }

  if (issueTitle === undefined
    && issueText === undefined
    && createdBy === undefined
    && assignedTo === undefined
    && statusText === undefined
    && open === undefined
  ) {
    return res.json({
      error: 'no update field(s) sent',
      _id: issueId
    });
  }

  Project.findBySlug(projectSlug, (error, project) => {
    if (error || !project) {
      return res.json({
        error: 'could not update',
        _id: issueId
      });
    }

    Issue.getIssue(issueId, (error, issue) => {
      if (error || !issue) {
        return res.json({
          error: 'could not update',
          _id: issueId
        });
      }

      let updatedFields = {};
      if (issueTitle !== undefined) {
        updatedFields.issue_title = issueTitle;
      }
      if (issueText !== undefined) {
        updatedFields.issue_text = issueText;
      }
      if (createdBy !== undefined) {
        updatedFields.created_by = createdBy;
      }
      if (assignedTo !== undefined) {
        updatedFields.assigned_to = assignedTo;
      }
      if (statusText !== undefined) {
        updatedFields.status_text = statusText;
      }
      if (open !== undefined) {
        updatedFields.open = open;
      }
      // check if updateFields is empty object
      if (Object.keys(updatedFields).length > 0) {
        updatedFields.updated_on = new Date();
      }

      Issue.updateIssue(issueId, updatedFields, (error, doc) => {
        if (error) {
          return res.json({
            error: 'could not update',
            _id: issueId
          });
        }

        return res.json({
          result: 'successfully updated',
          _id: doc._id,
        });
      });
    });
  });
};
