const { gql } = require('apollo-server-express');

const typeDefs = gql`
   type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    savedRecipes:[Recipe]
  }

  type Recipe {
   recipeName: String
   image: String
   createdAt: String
   ingredients: String
   instruction: String!
   totalTime: String!
  }
 
  type Auth {
    token: ID!
    user: User
  } 
  
  type Query {
    me: User
    getRecipes: Recipe
    getOneRecipe: Recipe 
  }
   
   input RecipeData {
    image: String
    createdAt: String
    recipeName: String
    ingredients: String
    instruction: String!
    totalTime: String!
  }


   type Mutation {
    login( email: String!, password: String!): Auth
    createUser( firstName: String!, lastName: String!, email: String!, password: String!): Auth
    saveRecipe( input: RecipeData! ): User
    createRecipe( input: RecipeData!): Recipe
    removeRecipe(recipeId: ID!): User
   }
`;

module.exports = typeDefs;
