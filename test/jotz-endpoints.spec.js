const knex = require('knex');
const app = require('../src/app');
const { makeNotesArray, makeMaliciousNote } = require('./jotz.fixtures');
const { makeFoldersArray } = require('./folders.fixtures');


describe('Jotz Endpoints', function () {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('clean the table', () =>
    db.raw('TRUNCATE jotz RESTART IDENTITY CASCADE')
  );

  afterEach('cleanup', () =>
    db.raw('TRUNCATE  jotz RESTART IDENTITY CASCADE')
  );

  xdescribe(`GET /api/jotz`, () => {
    context(`Given no notes`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/jotz')
          .expect(200, []);
      });
    });
    context(`Given there are notes in the database`, () => {
      const testNotes = makeNotesArray();
      const testFolders = makeFoldersArray();

      beforeEach('insert folders', () => {
        return db
          .into('surf-jotz_folders')
          .insert(testFolders)
          .then(() => {
            return db
              .into('surf-jotz_notes')
              .insert(testNotes);
          });
      });

      it('responds with 200 and all of the notes', () => {
        return supertest(app)
          .get('/api/notes')
          .expect(200, testNotes);
      });
    });
    context(`Given an XSS attack note`, () => {
      const testFolders = makeFoldersArray();
      const { maliciousNote, expectedNote } = makeMaliciousNote();

      beforeEach('insert malicious note', () => {
        return db
          .into('surf-jotz_folders')
          .insert(testFolders)
          .then(() => {
            return db
              .into('surf-jotz_notes')
              .insert([maliciousNote]);
          });
      });
      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/api/notes`)
          .expect(200)
          .expect(res => {
            expect(res.body[0].title).to.eql(expectedNote.title);
            expect(res.body[0].content).to.eql(expectedNote.content);
          });
      });
    });
  });
  

});