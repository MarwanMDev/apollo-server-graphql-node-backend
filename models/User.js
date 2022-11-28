const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  authToken: { type: String },
  roles: {
    type: String,
    enum: {
      values: ['GUEST', 'DEFAULT', 'ADMINISTRATOR'],
      message: '{VALUE} is not supported',
    },
    default: 'GUEST',
  },
});

module.exports = model('User', userSchema);
