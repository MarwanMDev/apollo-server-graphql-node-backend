const User = require('../../models/User');
const { ApolloError } = require('apollo-server-errors');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports = {
  Mutation: {
    async signUpUser(
      _,
      { signUpInput: { username, email, password } }
    ) {
      // Check if email is already existing
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        throw new ApolloError(
          'The email already exists',
          email,
          'USER_ALREADY_EXISTS'
        );
      }
      // Encrypt password
      var encryptedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      // Create JWT token
      const token = jwt.sign(
        {
          user_id: newUser._id,
          email,
        },
        'HIGH_RISK',
        { expiresIn: '2h' }
      );

      newUser.token = token;

      // Save new user to database
      const res = await newUser.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
    async signInUser(_, { signInInput: { email, password } }) {
      // Check if email is already existing
      const user = await User.findOne({ email });

      // Compare password against existing
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create new token
        const token = jwt.sign(
          {
            user_id: user._id,
            email,
          },
          'HIGH_RISK',
          { expiresIn: '2h' }
        );

        user.token = token;

        return {
          id: user.id,
          ...user._doc,
        };
      } else {
        // User does not exists
        throw new ApolloError(
          'The password is invalid',
          'INVALID_PASSWORD'
        );
      }
    },
  },
  Query: {
    async user(_, { id }) {
      return await User.findById(id);
    },
  },
};
