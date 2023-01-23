import { Router } from 'express';
import { convertUserDbToUser } from '../utils';

const route = Router();

export default (app) => {
  app.use('/feed', route);

  route.get('/', async (req, res, next) => {
    try {
      const stmtTweets = req.db.prepare(
        'SELECT id,body,user_id,created_at from tweets ORDER BY created_at DESC',
      );
      const tweetsDb = stmtTweets.all();

      const stmtUsers = req.db.prepare(
        'SELECT name,username,picture_url from users',
      );
      const usersDb = stmtUsers.all();

      const stmtComments = req.db.prepare(
        'SELECT id,body,tweet_id,user_id,created_at from tweets_comments',
      );
      const commentsDb = stmtComments.all();

      const tweets = tweetsDb.map(
        ({ id, body, user_id: userId, created_at: createdAt }) => ({
          id,
          body,
          user: convertUserDbToUser(
            usersDb.find((user) => user.name === userId),
          ),
          comments: commentsDb
            .filter((comment) => comment.tweet_id === id)
            .map((comment) => ({
              id: comment.id,
              body: comment.body,
              user: convertUserDbToUser(
                usersDb.find((user) => user.name === comment.user_id),
              ),
              createdAt: comment.created_at,
            })),
          createdAt,
        }),
      );
      res.status(200).json(tweets);
    } catch (e) {
      next(e);
    }
  });
};
