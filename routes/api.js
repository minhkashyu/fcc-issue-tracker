'use strict';

const projectController = require('../controllers/project/index.js');
const issueController = require('../controllers/issue/index.js');

module.exports = function(app) {
  app.route('/api/projects')
    .post(projectController.createProject);

  app.route('/api/issues/:project')
    .get(issueController.findManyIssues)
    .post(issueController.createIssue)
    .put(issueController.updateIssue)
    .delete(issueController.deleteIssue);
};
