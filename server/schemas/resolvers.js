const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (_, __, context) => {
            if (context.user) { return User.findOne({ _id: context.user._id }) }
            else {
                throw AuthenticationError;
            }
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate({ _id: context.user._id }, { $push: { savedBooks: bookData } }, { new: true })
            }
            throw AuthenticationError;
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate({ _id: context.user._id }, { $pull: { savedBooks: { bookId } } }, { new: true })
            }
            throw AuthenticationError;
        }


    },
};

module.exports = resolvers;
