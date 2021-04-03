const path = require('path');
const express = require('express');
const xss = require('xss');


const JotzService = require('./jotz-service');

const JotzRouter = express.Router();
const jsonParser = express.json();

const serializeJotz = jotz => ({
  id: jotz.id,
  date_published: jotz.date_published,
  title: xss(jotz.title),
  content: xss(jotz.content),
 city:xss(jotz.city),
});

JotzRouter
  .route('/')
  .get((req, res, next) => {

    const knexInstance = req.app.get('db');
    JotzService.getAllNotes(knexInstance)
      .then(jotz => {
        res.json(jotz.map(serializeJotz));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { title, content, city} = req.body;
    const newJotz = { title, content, city };

    for (const [key, value] of Object.entries(newJotz))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        });

    JotzService.insertNote(
      req.app.get('db'),
      newJotz
    )
      .then(jotz => {
        console.log('req.originalUrl', req.originalUrl);
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${jotz.id}`))
          .json(serializeJotz(jotz));
      })
      .catch(next);
  });

JotzRouter
  .route('/:jotz_id')
  .all((req, res, next) => {
    const { jotz_id } = req.params;
    const knexInstance = req.app.get('db');
    JotzService.getById(knexInstance, jotz_id)
      .then(note => {
        if (!note) {
          return res.status(404).json({
            error: { message: `Note Not Found` }
          });
        }
        res.jotz = jotz;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeJotz(res.jotz));
  })
  .delete((req, res, next) => {
    const { jotz_id } = req.params;
    const knexInstance = req.app.get('db');
    JotzService.deleteNote(knexInstance, jotz_id)
      .then(numRowsAffected => {
        res.status(204).end;
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const { title,content,city } = req.body;
    const jotzToUpdate = { title,content,city };

    const numberOfValues = Object.values(jotzToUpdate).filter(Boolean).length;
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain either, 'title'`
        }
      });

    JotzService.updateJotz(
      req.app.get('db'),
      req.params.jotz_id,
      jotzToUpdate
    )
      .then(numRowsAffected => {
        console.log('numrows affected', numRowsAffected);
        res.status(204).end();
      })
      .catch(next);
  });




module.exports = JotzRouter;