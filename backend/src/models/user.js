/* eslint-disable func-names */
/* eslint-disable no-use-before-define */
import mongoose, { Schema } from 'mongoose';
import { hash, compare } from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: email => User.dontExist({ email }),
      message: () => 'Email has already been taken'
    }
  },
  userName: {
    type: String,
    validate: {
      validator: userName => User.dontExist({ userName }),
      message: () => 'Username has already been taken'
    }
  },
  chats: [{
    type: Schema.Types.ObjectId,
    ref: 'Chat'
  }],
  name: String,
  password: String,
},
{
  timestamps: true
});

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
});

userSchema.statics.dontExist = async function (options) {
  return await this.where(options).countDocuments() === 0;
};

userSchema.methods.matchPassword = function (password) {
  return compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
