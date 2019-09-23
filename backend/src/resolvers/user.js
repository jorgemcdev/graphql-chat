/* eslint no-unused-vars: 0 */
import Joi from 'joi';

// Models and Schemas
import { User } from '../models';
import { signUp, signIn } from '../schemas';

// Utils
import { isObjectId } from '../utils/utilsFuncs';
import * as Auth from '../utils/auth';

export default {
  Query: {
    me: (root, arg, { req }, info) => {
      // TODOS: projection
      Auth.checkSignedIn(req);
      return User.findById(req.session.userId);
    },
    users: (root, arg, { req }, info) => {
      // TODOS: projection, pagination
      Auth.checkSignedIn(req);
      return User.find({});
    },
    user: (root, { id }, context, info) => {
      isObjectId(id);
      return User.findById(id);
    }
  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      Auth.checkSignedOut(req);
      await Joi.validate(args, signUp, { abortEarly: false });
      const user = await User.create(args);
      req.session.userId = user.id;
      return user;
    },
    signIn: async (root, args, { req }, info) => {
      const { userId } = req.session;
      if (userId) {
        return User.findById(userId);
      }

      await Joi.validate(args, signIn, { abortEarly: true });
      const user = await Auth.attemptSignIn(args.email, args.password);
      req.session.userId = user.id;
      return user;
    },
    signOut: (root, args, { req, res }, info) => {
      Auth.checkSignedIn(req);
      return Auth.signOut(req, res);
    }
  }
};
