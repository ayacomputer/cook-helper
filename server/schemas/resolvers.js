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
      return await Recipe.findOne({ _id });
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
      // if (context.user) {
      return await Recipe.create(input);
      // // }
      // throw new AuthenticationError('You need to be logged in!');

    },
    saveRecipe: async (_, { input }, context) => {
      console.log(input)
      return await User.findOneAndUpdate({ _id: context.user._id },
        { $addToSet: { savedRecipes: input } },
        { new: true });
    }
      throw new AuthenticationError('You need to be logged in!');
  },
  removeRecipe: async (_, { _id }, context) => {

    if (context.user) {
      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedRecipes: { _id } } },
        { new: true });
    }
    throw new AuthenticationError('You need to be logged in!');
  },
  deleteRecipe: async (_, { _id }, context) => {

    if (context.user) {
      return Recipe.findOneAndDelete({ _id });
    }
    throw new AuthenticationError('You need to be logged in!');
  }
}
}
module.exports = resolvers;
