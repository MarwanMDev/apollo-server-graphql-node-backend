const { model, Schema } = require('mongoose');

const messageSchema = new Schema({
  text: String,
  createdAt: String,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = model('Message', messageSchema);
