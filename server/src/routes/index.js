import { Router } from 'express';
import activity from './feed';
import auth from './auth';
import user from './user';
import tweets from './tweets';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  activity(app);
  auth(app);
  user(app);
  tweets(app);

  return app;
};
