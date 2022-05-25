const { convertNodeHttpToRequest } = require('apollo-server-core');
const { AuthenticationError } = require('apollo-server-express');
const { Recipe, User, Cooking } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (_, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    getRecipes: async () => {
      return await Recipe.find().sort({ createdAt: -1 });
    },
    getOneRecipe: async (_, { _id }) => {
      console.log("-----id:", _id)
      return await Recipe.findOne({ _id });
    },
    getRecipesByIds: async (_, { _id }) => {
      console.log("-----ids:", _id)
      return await Recipe.find({ _id: { $in: _id } });
    }
  },

  Mutation: {
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
    createRecipe: async (_, { input },) => {
      console.log(input)
      if (context.user) {
        return await Recipe.create(input);
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    selectRecipe: async (_, { _id }, context) => {
      console.log("input for selectRecipe mutation", _id)
      if (context.user) {
        return await User.findOneAndUpdate({ _id: context.user._id },
          { $addToSet: { selectedRecipeIds: _id } },
          { new: true });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeRecipe: async (_, { _id }, context) => {
      console.log("input for removeRecipe mutation", _id)
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { selectedRecipeIds: _id } },
          { new: true });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteRecipe: async (_, { _id }, context) => {

      if (context.user) {
        return Recipe.findOneAndDelete({ _id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateRecipe: async (_, { input }, context) => {
      if (context.user) {
        return Recipe.findOneAndUpdate({ _id: input._id }, { ...input }, { new: true });
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  }
}
module.exports = resolvers;
