const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  authToken: { type: String },
});

module.exports = model('User', userSchema);
