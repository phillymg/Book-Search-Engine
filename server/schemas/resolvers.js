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

    // Mutation: {
    //     addUser: async (parent, { username, email, password }) => {
    //         const user = await User.create({ username, email, password });
    //         const token = signToken(user);
    //         return { token, user };
    //     },
    //     login: async (parent, { email, password }) => {
    //         const user = await User.findOne({ email });

    //         if (!user) {
    //             throw AuthenticationError;
    //         }

    //         const correctPw = await user.isCorrectPassword(password);

    //         if (!correctPw) {
    //             throw AuthenticationError;
    //         }

    //         const token = signToken(user);

    //         return { token, user };
    //     },
    //     addThought: async (parent, { thoughtText, thoughtAuthor }) => {
    //         const thought = await Thought.create({ thoughtText, thoughtAuthor });

    //         await User.findOneAndUpdate(
    //             { username: thoughtAuthor },
    //             { $addToSet: { thoughts: thought._id } }
    //         );

    //         return thought;
    //     },
    //     addComment: async (parent, { thoughtId, commentText, commentAuthor }) => {
    //         return Thought.findOneAndUpdate(
    //             { _id: thoughtId },
    //             {
    //                 $addToSet: { comments: { commentText, commentAuthor } },
    //             },
    //             {
    //                 new: true,
    //                 runValidators: true,
    //             }
    //         );
    //     },
    //     removeThought: async (parent, { thoughtId }) => {
    //         return Thought.findOneAndDelete({ _id: thoughtId });
    //     },
    //     removeComment: async (parent, { thoughtId, commentId }) => {
    //         return Thought.findOneAndUpdate(
    //             { _id: thoughtId },
    //             { $pull: { comments: { _id: commentId } } },
    //             { new: true }
    //         );
    //     },
    // },
};

module.exports = resolvers;
