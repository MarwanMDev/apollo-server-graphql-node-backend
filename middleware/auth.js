const { AuthenticationError } = require('apollo-server');
var jwt = require('jsonwebtoken');

module.exports = (context) => {
  const authHeader = context.req.header.authorization;

  if (authHeader) {
    // Check if bearer token
    const token = authHeader.split('Bearer')[1];

    if (token) {
      try {
        const user = jwt.verify(token, 'HIGH_RISK');
        return user;
      } catch (error) {
        throw new AuthenticationError(
          'Invalid or Expired Token',
          error
        );
      }
      throw new AuthenticationError(
        'Auth token must be a valid bearer token'
      );
    }
    throw new AuthenticationError('Auth header must be provided');
  }
};
