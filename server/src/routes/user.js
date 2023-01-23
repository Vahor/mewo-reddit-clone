import { Router } from 'express';
import { convertUserDbToUser } from '../utils';

const route = Router();

export default (app) => {
  app.use('/users', route);

  route.get('/', async (req, res, next) => {
    try {
      const stmt = req.db.prepare(
        'SELECT name,username,picture_url from users',
      );
      const usersDb = stmt.all();
      res.status(200).json(usersDb.map(convertUserDbToUser));
    } catch (e) {
      next(e);
    }
  });

  route.get('/:name', async (req, res, next) => {
    try {
      const { name: userId } = req.params;
      const stmtUserDb = req.db.prepare(
        'SELECT name,username,picture_url from users WHERE name = ?',
      );
      const userDb = stmtUserDb.get(userId);
      const user = convertUserDbToUser(userDb);

      const stmtUsers = req.db.prepare(
        'SELECT name,username,picture_url from users',
      );
      const usersDb = stmtUsers.all();

      const stmtTweets = req.db.prepare(
        'SELECT id,body,user_id,created_at from tweets WHERE user_id = ? ORDER BY created_at DESC',
      );
      const tweetsDb = stmtTweets.all(userId);

      const stmtComments = req.db.prepare(
        'SELECT id,body,tweet_id,user_id,created_at from tweets_comments',
      );
      const commentsDb = stmtComments.all();

      const tweets = tweetsDb.map(({ id, body, created_at: createdAt }) => ({
        id,
        body,
        user: convertUserDbToUser(userDb),
        comments: commentsDb
          .filter((comment) => comment.tweet_id === id)
          .map((comment) => ({
            id: comment.id,
            body: comment.body,
            user: convertUserDbToUser(
              usersDb.find(({ name }) => name === comment.user_id),
            ),
            createdAt: comment.created_at,
          })),
        createdAt,
      }));

      if (user) {
        res.status(200).json({ ...user, tweets });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (e) {
      next(e);
    }
  });
};
