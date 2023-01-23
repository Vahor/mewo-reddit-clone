import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import middlewares from '../middlewares';

const route = Router();

export default (app) => {
  app.use('/tweets', route);

  route.post(
    '/',
    celebrate({
      body: Joi.object({
        body: Joi.string().required(),
      }),
    }),
    middlewares.isAuth,
    async (req, res, next) => {
      try {
        const stmt = req.db.prepare(
          'INSERT INTO tweets (body, user_id, created_at) VALUES (?, ?, ?)',
        );
        stmt.run(req.body.body, req.auth.user.name, new Date().toISOString());
        res.status(200).send();
      } catch (e) {
        next(e);
      }
    },
  );

  route.post('/:id/comments', async (req, res, next) => {
    try {
      throw new Error('Not implemented');
    } catch (e) {
      next(e);
    }
  });

  route.post('/:id/favorite', async (req, res, next) => {
    try {
      throw new Error('Not implemented');
    } catch (e) {
      next(e);
    }
  });

  route.post('/:id/unfavorite', async (req, res, next) => {
    try {
      throw new Error('Not implemented');
    } catch (e) {
      next(e);
    }
  });
};
