import { AuthenticationError } from 'apollo-server-express';
import { User } from '../models';

require('dotenv').config();

const { SESSION_NAME } = process.env;

export const attemptSignIn = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AuthenticationError('Email incorrect.');
  }

  if (!user.matchPassword(password)) {
    throw new AuthenticationError('Password incorrect.');
  }
  return user;
};

export const checkSignedIn = (req) => {
  if (!req.session.userId) {
    throw new AuthenticationError('You Must be signed in.');
  }
};

export const checkSignedOut = (req) => {
  if (req.session.userId) {
    throw new AuthenticationError('You are already signed In.');
  }
};

export const signOut = (req, res) => new Promise(
  (resolve, reject) => {
    req.session.destroy((err) => {
      if (err) reject(err);
      res.clearCookie(SESSION_NAME);
      resolve(true);
    });
  }
);
