const knex = require('knex');
const app = require('../src/app');
// const config = require('../src/config');
const supertest = require('supertest');
// const JotzService = require('../src/jotz/jotz-service');




describe('GET /api/jotz', () => {

  function makeNoteArray() {
    return [
      {
        content: 'content',
        id: 1,
        title: 'title',
        city: 'san diego',
      },
    ];
  }

  describe('GET /api/jotz/:jotz_id', () => {
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

    context('Given there are jotz in the database', () => {
      const testNote = makeNoteArray();

      beforeEach('insert jotz', () => {
        return db.into('jotz').insert(testNote);
      });

      it('responds with 200 and all of the jotz', () => {
        return supertest(app)
          .get('/api/jotz')
          // .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(res => {
            expect(res.body[0].note).to.eql(testNote[0].jotz);
            // expect(res.body[0]).to.have.property('id');
          });
      });
    });
  });
});;