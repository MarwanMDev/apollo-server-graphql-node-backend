const gql = require('graphql-tag');

module.exports = gql`
  type User {
    id: ID!
    username: String
    email: String
    password: String
    authToken: String
    roles: UserRole!
  }

  type Message {
    text: String
    createdAt: String
    createdBy: User!
  }

  enum UserRole {
    GUEST
    DEFAULT
    ADMINISTRATOR
  }

  input MessageInput {
    text: String!
    username: String
    createdBy: ID!
  }

  input SignUpInput {
    username: String
    email: String
    password: String
  }

  input SignInInput {
    email: String
    password: String
  }

  type Query {
    messages: [Message]
    message(id: ID!): Message
    user(id: ID!): User
    getUserByAuthToken(authToken: String): User
  }

  type Mutation {
    createMessage(messageInput: MessageInput): Message!
    signUpUser(signUpInput: SignUpInput): User
    signInUser(signInInput: SignInInput): User
  }
`;
