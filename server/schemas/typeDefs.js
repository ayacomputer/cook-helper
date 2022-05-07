const { gql } = require('apollo-server-express');

const typeDefs = gql`
   type User {
    _id: ID!
    username: String!
    email: String!
    savedRecipes:[Recipe]
  }

  type Recipe {
   _id: ID!
   name: String
   image: String
   createdAt: String
   ingredients: [Ingredients]
   steps: [String]
   totalTime: Int
   serves: Int
  }

  type Ingredients {
    name: String
    qty: String
  }


  type Auth {
    token: ID!
    user: User
  } 
  
  type Query {
    me: User
    getRecipes: [Recipe]
    getOneRecipe(_id: ID!): Recipe 
  }
   
   input RecipeInput {
    image: String
    name: String
    ingredients: [IngredientInput]
    steps: [String]
    totalTime: Int
    serves: Int
  }

  input IngredientInput {
    name: String
    qty: String
  }


   type Mutation {
    login( email: String!, password: String!): Auth
    createUser( username: String!, email: String!, password: String!): Auth
    saveRecipe( input: RecipeInput! ): User
    createRecipe( input: RecipeInput!): Recipe
    removeRecipe(recipeId: ID!): User
    deleteRecipe(recipeId: ID!): Recipe
   }
`;

module.exports = typeDefs;
