const createIssue = require('./create.js');
const deleteIssue = require('./delete');
const findManyIssues = require('./find-many');
const updateIssue = require('./update.js');

module.exports = {
  createIssue,
  deleteIssue,
  findManyIssues,
  updateIssue,
};
