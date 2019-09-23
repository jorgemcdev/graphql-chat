/* eslint no-unused-vars: 0 */
import Joi from 'joi';
import { UserInputError } from 'apollo-server-express';

import { startChat, signIn } from '../schemas';
import { User, Chat, Message } from '../models';

import * as Auth from '../utils/auth';

export default {
  Mutation: {
    startChat: async (root, args, { req }, info) => {
      const { userId } = req.session;
      const { title, userIds } = args;

      await Joi.validate(args, startChat(userId), { abortEarly: false });

      const idsFound = await User.where('_id').in(userIds).countDocuments();

      if (idsFound !== userIds.length) {
        throw new UserInputError('One or more User IDs are invalid.');
      }

      userIds.push(userId);

      const chat = await Chat.create({ title, users: userIds });

      await User.updateMany({ _id: { $in: userIds } }, {
        $push: { chats: chat }
      });

      return chat;
    }
  },
  Chat: {
    messages: (chat, args, { req }, info) => {
      // TODO: pagination, projection
      Auth.checkSignedIn(req);
      return Message.find({ chat: chat.id });
    },
    users: async (chat, args, { req }, info) => {
      Auth.checkSignedIn(req);
      return (await chat.populate('users').execPopulate()).users;
    },
    lastMessage: async (chat, args, { req }, info) => {
      Auth.checkSignedIn(req);
      return (await chat.populate('lastMessage').execPopulate()).lastMessage;
    }
  }
};
