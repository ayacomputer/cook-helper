const { gql } = require('apollo-server-express');

const typeDefs = gql`
   type User {
    _id: ID!
    username: String!
    email: String!
    recipeCount: Int
    selectedRecipes:[Recipe]
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
   
   input SelectedRecipeInput {
    _id: String 
    image: String
    name: String
    createdAt: String
    ingredients: [IngredientInput]
    steps: [String]
    totalTime: Int
    serves: Int
  }

  input RecipeInput {
    _id: String 
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
    selectRecipe( input: SelectedRecipeInput! ): User
    createRecipe( input: RecipeInput!): Recipe
    removeRecipe(_id: ID!): User
    deleteRecipe(_id: ID!): Recipe
   }
`;

module.exports = typeDefs;
