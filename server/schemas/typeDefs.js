const { gql } = require('apollo-server-express');

const typeDefs = gql`
   type User {
    _id: ID!
    username: String!
    email: String!
    recipeCount: Int
    selectedRecipeIds:[ID]
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
    getRecipesByIds(_id: [ID]!): [Recipe] 
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

  input UpdateRecipeInput {
    _id: String 
    image: String
    name: String
    ingredients: [IngredientInput]
    steps: [String]
    totalTime: Int
    serves: Int
    createdAt: String
  }
  input IngredientInput {
    name: String
    qty: String
  }


   type Mutation {
    login( email: String!, password: String!): Auth
    createUser( username: String!, email: String!, password: String!): Auth
    selectRecipe(_id: String! ): User
    createRecipe( input: RecipeInput!): Recipe
    removeRecipe(_id: ID!): User
    updateRecipe( input: UpdateRecipeInput!): Recipe
    deleteRecipe(_id: ID!): Recipe
   }
`;

module.exports = typeDefs;
