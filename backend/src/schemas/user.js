import Joi from 'joi';

const email = Joi.string()
  .email()
  .required()
  .label('Email');

const userName = Joi.string()
  .alphanum()
  .min(4).max(30)
  .required()
  .label('Username');

const name = Joi.string()
  .max(254)
  .required()
  .label('Name');

const password = Joi.string()
  .min(8).max(50)
  .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,50}$/)
  .label('Password')
  .options({
    language: {
      string: {
        regex: {
          base: 'Minimum 8 characters to 50 Max, and at least one letter and one number'
        }
      }
    }
  });

export const signUp = Joi.object().keys({
  email,
  userName,
  name,
  password
});

export const signIn = Joi.object().keys({
  email,
  password
});
