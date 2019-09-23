import { gql } from 'apollo-server-express';

const user = gql`
  extend type Query {
    me: User
    user(id: ID!): User
    users: [User!]
  }

  extend type Mutation {
    signUp(
      email: String!,
      userName: String!,
      name: String!,
      password: String!
    ): User
    signIn(
      email: String!,
      password: String!
    ): User
    signOut: Boolean
  }

  type User {
    id: ID!
    email: String
    userName: String
    name: String
    createdAt: String
  }
`;

export default user;
