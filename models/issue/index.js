'use strict';

let mongoose = require('../../models/connection.js');

const IssueSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
    issue_title: {
      type: String,
      required: true,
    },
    issue_text: {
      type: String,
      required: true,
    },
    created_by: {
      type: String,
      required: true,
    },
    assigned_to: {
      type: String,
      default: '',
    },
    open: {
      type: Boolean,
      default: true,
    },
    status_text: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: {
      createdAt: 'created_on',
      updatedAt: 'updated_on',
    },
    toJSON: {
      transform: function(doc, ret) {
        delete ret.id;
        delete ret.__v;
        delete ret.project;
      },
    },
    toObject: {
      transform: function(doc, ret) {
        delete ret.id;
        delete ret.__v;
        delete ret.project;
      },
    },
  },
);

const IssueModel = mongoose.model('Issue', IssueSchema);

const createAndSaveIssue = require('./create.js');
const getIssue = require('./find-by-id.js');
const updateIssue = require('./update.js');
const deleteIssue = require('./delete.js');
const fetchIssues = require('./find-many.js');

module.exports = {
  IssueModel,
  createAndSaveIssue: (obj, done) => {
    createAndSaveIssue(IssueModel, obj, done);
  },
  getIssue: (issueId, done) => {
    getIssue(IssueModel, issueId, done);
  },
  updateIssue: (issueId, obj, done) => {
    updateIssue(IssueModel, issueId, obj, done);
  },
  deleteIssue: (issueId, done) => {
    deleteIssue(IssueModel, issueId, done);
  },
  fetchIssues: (objCriteria, limit, done) => {
    fetchIssues(IssueModel, objCriteria, limit, done);
  },
};
