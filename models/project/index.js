'use strict';

let mongoose = require('../../models/connection.js');

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const ProjectModel = mongoose.model('Project', ProjectSchema);

const createAndSaveProject = require('./create.js');
const findBySlug = require('./find-by-slug.js');

module.exports = {
  ProjectModel,
  createAndSaveProject: (projectName, projectSlug, done) => {
    createAndSaveProject(ProjectModel, projectName, projectSlug, done);
  },
  findBySlug: (projectSlug, done) => {
    findBySlug(ProjectModel, projectSlug, done);
  },
};
