const { ApolloServer, gql } = require('apollo-server');
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
    following: Int!
  }

  type Query {
    user(username: String!): User!
  }
`;

const resolvers = {
  Query: {
    async user(_, a) {
      const data = await getData(a.username);
      return data;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
