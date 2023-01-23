import bcrypt from 'bcrypt';
import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import { faker } from '@faker-js/faker';
import jwt from 'jsonwebtoken';

import config from '../config';

const routeLogin = Router();
const routeSignup = Router();

const ERROR_LOGIN = new Error('Invalid login or password!');
ERROR_LOGIN.status = 400;

const buildTokenFromUser = ({
  name,
  username,
  picture_url: profilePicture,
}) => {
  const user = {
    name,
    username,
    profilePicture,
  };
  return jwt.sign({ user }, config.jwtSecret, {
    algorithm: config.jwtAlgorithm,
  });
};

export default (app) => {
  app.use('/signin', routeLogin);
  app.use('/signup', routeSignup);

  routeLogin.post(
    '/',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      try {
        const { name, password } = req.body;
        const stmt = req.db.prepare(
          'SELECT name,username,password,picture_url FROM users WHERE name = ?',
        );
        const user = stmt.get(name);

        if (!user) {
          next(ERROR_LOGIN);
        } else if (!(await bcrypt.compare(password, user.password))) {
          next(ERROR_LOGIN);
        } else {
          const token = buildTokenFromUser(user);
          res.status(200).json({ token });
        }
      } catch (e) {
        next(e);
      }
    },
  );

  routeSignup.post(
    '/',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      try {
        const { name, username, password: passwordPlain } = req.body;
        const password = await bcrypt.hash(passwordPlain, 16);
        const profilePicture = faker.image.avatar();
        const stmt = req.db.prepare(
          'INSERT INTO users (name, username, password, picture_url) VALUES (?, ?, ?, ?)',
        );
        stmt.run(req.body.name, req.body.username, password, profilePicture);
        const token = buildTokenFromUser({ name, username, profilePicture });
        res.status(200).json({ token });
      } catch (e) {
        next(e);
      }
    },
  );
};
