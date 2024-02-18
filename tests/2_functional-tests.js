const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(5000);

  const projectSlug = 'apitest';
  const testIssue = {
    issue_title: 'Test issue',
    issue_text: 'Test issue text',
    created_by: 'Functional Test - Every field',
    assigned_to: 'Chai and Mocha',
    status_text: 'In QA',
  };
  let issueId = '';

  // * Create an issue with every field: POST request to `/api/issues/{project}`
  test(
    'Create an issue with every field: POST request to `/api/issues/{project}`',
    (done) => {
      chai.request(server)
        .keepOpen()
        .post(`/api/issues/${projectSlug}`)
        .type('form')
        .send(testIssue)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, '_id');
          assert.property(res.body, 'created_on');
          assert.property(res.body, 'updated_on');
          assert.equal(res.body.issue_title, testIssue.issue_title);
          assert.equal(res.body.issue_text, testIssue.issue_text);
          assert.equal(res.body.created_by, testIssue.created_by);
          assert.equal(res.body.assigned_to, testIssue.assigned_to);
          assert.equal(res.body.status_text, testIssue.status_text);
          assert.equal(res.body.open, true);

          issueId = res.body._id;
          done();
        });
    });

  // * Create an issue with only required fields: POST request to `/api/issues/{project}`
  test(
    'Create an issue with only required fields: POST request to `/api/issues/{project}`',
    (done) => {
      chai.request(server)
        .keepOpen()
        .post(`/api/issues/${projectSlug}`)
        .type('form')
        .send({
          issue_title: testIssue.issue_title,
          issue_text: testIssue.issue_text,
          created_by: testIssue.created_by,
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, '_id');
          assert.property(res.body, 'created_on');
          assert.property(res.body, 'updated_on');
          assert.equal(res.body.issue_title, testIssue.issue_title);
          assert.equal(res.body.issue_text, testIssue.issue_text);
          assert.equal(res.body.created_by, testIssue.created_by);
          assert.equal(res.body.assigned_to, '');
          assert.equal(res.body.status_text, '');
          assert.equal(res.body.open, true);
          done();
        });
    });

  // * Create an issue with missing required fields: POST request to `/api/issues/{project}`
  test(
    'Create an issue with missing required fields: POST request to `/api/issues/{project}`',
    (done) => {
      chai.request(server)
        .keepOpen()
        .post(`/api/issues/${projectSlug}`)
        .type('form')
        .send({})
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'required field(s) missing');
          done();
        });
    });

  // * View issues on a project: GET request to `/api/issues/{project}`
  test('View issues on a project: GET request to `/api/issues/{project}`',
    (done) => {
      chai.request(server)
        .keepOpen()
        .get(`/api/issues/${projectSlug}`)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          if (res.body.length > 0) {
            let firstIssue = res.body[0];
            assert.property(firstIssue, '_id');
            assert.property(firstIssue, 'created_on');
            assert.property(firstIssue, 'updated_on');
            assert.property(firstIssue, 'issue_title');
            assert.property(firstIssue, 'issue_text');
            assert.property(firstIssue, 'created_by');
            assert.property(firstIssue, 'assigned_to');
            assert.property(firstIssue, 'status_text');
            assert.property(firstIssue, 'open');
          }
          done();
        });
    });

  // * View issues on a project with one filter: GET request to `/api/issues/{project}`
  test(
    'View issues on a project with one filter: GET request to `/api/issues/{project}`',
    (done) => {
      chai.request(server)
        .keepOpen()
        .get(`/api/issues/${projectSlug}?open=true`)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          if (res.body.length > 0) {
            let firstIssue = res.body[0];
            assert.property(firstIssue, '_id');
            assert.property(firstIssue, 'created_on');
            assert.property(firstIssue, 'updated_on');
            assert.property(firstIssue, 'issue_title');
            assert.property(firstIssue, 'issue_text');
            assert.property(firstIssue, 'created_by');
            assert.property(firstIssue, 'assigned_to');
            assert.property(firstIssue, 'status_text');
            assert.equal(firstIssue.open, true);
          }
          done();
        });
    });

  // * View issues on a project with multiple filters: GET request to `/api/issues/{project}`
  test(
    'View issues on a project with multiple filters: GET request to `/api/issues/{project}`',
    (done) => {
      chai.request(server)
        .keepOpen()
        .get(
          `/api/issues/${projectSlug}?issue_title=${testIssue.issue_title}&issue_text=${testIssue.issue_text}&created_by=${testIssue.created_by}&assigned_to=${testIssue.assigned_to}&status_text=${testIssue.status_text}&open=true`)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          if (res.body.length > 0) {
            let firstIssue = res.body[0];
            assert.property(firstIssue, '_id');
            assert.property(firstIssue, 'created_on');
            assert.property(firstIssue, 'updated_on');
            assert.property(firstIssue, 'issue_title');
            assert.property(firstIssue, 'issue_text');
            assert.property(firstIssue, 'created_by');
            assert.property(firstIssue, 'assigned_to');
            assert.property(firstIssue, 'status_text');
            assert.equal(firstIssue.open, true);
          }
          done();
        });
    });

  // * Update one field on an issue: PUT request to `/api/issues/{project}`
  test('Update one field on an issue: PUT request to `/api/issues/{project}`',
    (done) => {
      chai.request(server)
        .keepOpen()
        .put(`/api/issues/${projectSlug}`)
        .send({
          _id: issueId,
          issue_title: testIssue.issue_title,
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.result, 'successfully updated');
          assert.property(res.body, '_id');
          done();
        });
    });

  // * Update multiple fields on an issue: PUT request to `/api/issues/{project}`
  test(
    'Update multiple fields on an issue: PUT request to `/api/issues/{project}`',
    (done) => {
      chai.request(server)
        .keepOpen()
        .put(`/api/issues/${projectSlug}`)
        .send({
          _id: issueId,
          issue_title: testIssue.issue_title,
          issue_text: testIssue.issue_text,
          created_by: testIssue.created_by,
          assigned_to: testIssue.assigned_to,
          status_text: testIssue.status_text,
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.result, 'successfully updated');
          assert.property(res.body, '_id');
          done();
        });
    });

  // * Update an issue with missing `_id`: PUT request to `/api/issues/{project}`
  test(
    'Update an issue with missing `_id`: PUT request to `/api/issues/{project}`',
    (done) => {
      chai.request(server)
        .keepOpen()
        .put(`/api/issues/${projectSlug}`)
        .send({
          issue_title: testIssue.issue_title,
          issue_text: testIssue.issue_text,
          created_by: testIssue.created_by,
          assigned_to: testIssue.assigned_to,
          status_text: testIssue.status_text,
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'missing _id');
          done();
        });
    });

  // * Update an issue with no fields to update: PUT request to `/api/issues/{project}`
  test(
    'Update an issue with no fields to update: PUT request to `/api/issues/{project}`',
    (done) => {
      chai.request(server)
        .keepOpen()
        .put(`/api/issues/${projectSlug}`)
        .send({
          _id: issueId,
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'no update field(s) sent');
          assert.equal(res.body._id, issueId);
          done();
        });
    });

  // * Update an issue with an invalid `_id`: PUT request to `/api/issues/{project}`
  test(
    'Update an issue with an invalid `_id`: PUT request to `/api/issues/{project}`',
    (done) => {
      chai.request(server)
        .keepOpen()
        .put(`/api/issues/${projectSlug}`)
        .send({
          _id: 'test',
          issue_title: testIssue.issue_title,
          issue_text: testIssue.issue_text,
          created_by: testIssue.created_by,
          assigned_to: testIssue.assigned_to,
          status_text: testIssue.status_text,
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'could not update');
          assert.equal(res.body._id, 'test');
          done();
        });
    });

  // * Delete an issue: DELETE request to `/api/issues/{project}`
  test('Delete an issue: DELETE request to `/api/issues/{project}`', (done) => {
    chai.request(server)
      .keepOpen()
      .delete(`/api/issues/${projectSlug}`)
      .send({
        _id: issueId,
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.result, 'successfully deleted');
        assert.equal(res.body._id, issueId);
        done();
      });
  });

  // * Delete an issue with an invalid `_id`: DELETE request to `/api/issues/{project}`
  test(
    'Delete an issue with an invalid `_id`: DELETE request to `/api/issues/{project}`',
    (done) => {
      chai.request(server)
        .keepOpen()
        .delete(`/api/issues/${projectSlug}`)
        .send({
          _id: 'test',
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'could not delete');
          assert.equal(res.body._id, 'test');
          done();
        });
    });

  // * Delete an issue with missing `_id`: DELETE request to `/api/issues/{project}`
  test(
    'Delete an issue with missing `_id`: DELETE request to `/api/issues/{project}`',
    (done) => {
      chai.request(server)
        .keepOpen()
        .delete(`/api/issues/${projectSlug}`)
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'missing _id');
          done();
        });
    });
});
