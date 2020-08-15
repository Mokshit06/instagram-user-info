const { ApolloServer, ApolloError, gql } = require('apollo-server');
const getData = require('./utils/puppeteer');

const typeDefs = gql`
  type User {
    username: String!
    name: String!
    bio: String!
    bio_html: String!
    website: String!
    profile_image: String!
    followers: Int!
    isPrivate: Boolean!
    following: Int!
    posts: [Post!]
  }

  type Post {
    link: String!
    image: String!
  }

  type Query {
    user(username: String!): User!
  }
`;

const resolvers = {
  Query: {
    async user(_parent, { username }) {
      const data = await getData(username);
      return data;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
