const Message = require('../../models/Message');

module.exports = {
  Mutation: {
    async createMessage(
      _,
      { messageInput: { text, username, createdBy } },
      context
    ) {
      if (!context.user) return null;

      const newMessage = new Message({
        text: text,
        createdBy: createdBy,
        createdAt: new Date().toISOString(),
      });

      const res = await newMessage.save();
      console.log(res);
      return {
        id: res.id,
        ...res._doc,
      };
    },
  },
  Query: {
    async message(_, { id }) {
      return await Message.findById(id);
    },
    async messages(_parent, _args, context) {
      console.log(context.user);
      // if (!context.user || !context.user.roles.includes('admin'))
      if (!context.user || context.user.roles !== 'ADMINISTRATOR')
        return null;
      // if (!context.user) return null;
      // console.log(context.user);
      return await Message.find().populate('createdBy');
    },
  },
};
