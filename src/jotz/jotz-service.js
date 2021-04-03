const JotzService = {

  getAllJotz(knex) {
    return knex.select('*').from('jotz');
  },
  //ASK MENTOR ABOUT THIS
  insertNote(knex, newJotz) {
    return knex
      .insert(newJotz)
      .into('jotz')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

  getById(knex, id) {
    return knex
      .from('surf-jotz_notes')
      .select('*')
      .where('id', id)
      .first();
  },

  deleteNote(knex, id) {
    return knex('jotz')
      .where({ id })
      .delete();
  },

  updateJotz(knex, id, newJotzFields) {
    return knex('jotz')
      .where({ id })
      .update(newJotzFields);
  }
};

module.exports = JotzService;