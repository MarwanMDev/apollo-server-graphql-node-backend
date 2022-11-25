const gql = require('graphql-tag');

module.exports = gql`
  type Message {
    text: String
    createdAt: String
    createdBy: String
  }

  type User {
    id: ID!
    username: String
    email: String
    password: String
    token: String
  }

  input MessageInput {
    text: String
    username: String
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
  }

  type Mutation {
    createMessage(messageInput: MessageInput): Message!
    signUpUser(signUpInput: SignUpInput): User
    signInUser(signInInput: SignInInput): User
  }
`;
