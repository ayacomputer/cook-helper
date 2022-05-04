const { createSourceEventStream } = require('graphql');
const { Recipe, User } = require('../models');

const resolvers = {
  Query: {
    me: async (_, _, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    getRecipes: async () => {
      return await Recipe.find().sort({ createdAt: -1 });
    },
    getOneRecipe: async (_, { recipeId }) => {
      return await Recipe.findOne({ _id: recipeId });
    }
  },

  mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);

      return { token, user };
    },
    createUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    saveRecipe: async (_, { input }, context) => {

      if (context.user) {
        return await User.findOneAndUpdate({ _id: context.user._id },
          { $addToSet: { savedRecipes: input } },
          { new: true });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeRecipe: async (_, { recipeId }, context) => {

      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedRecipes: { recipeId } } },
          { new: true });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

  }
};

module.exports = resolvers;
