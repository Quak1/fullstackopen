const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("./utils/config");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user.js");

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const query = {};
      if (args.genre) query.genres = args.genre;
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (!author) return null;
        query.author = author.id;
      }
      return await Book.find(query).populate("author");
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError("Not authenticated");

      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        await author.save();
      }

      const newBook = new Book({ ...args, author: author.id });
      try {
        await newBook.save();
      } catch (error) {
        throw new UserInputError(error.message);
      }

      return newBook.populate("author");
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError("Not authenticated");

      const author = await Author.findOne({ name: args.name });
      if (!author) return null;

      try {
        author.born = args.born;
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message);
      }

      return author;
    },
    createUser: async (root, args) => {
      try {
        const user = new User(args);
        await user.save();
        return user;
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "password") {
        throw new UserInputError("Wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };
      const token = jwt.sign(userForToken, JWT_SECRET);

      return { value: token };
    },
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name });
      return Book.countDocuments({ author: author.id });
    },
  },
};

module.exports = resolvers;
