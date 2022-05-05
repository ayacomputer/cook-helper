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
   recipeId: String
   image: String
   createdAt: String
   recipeName: String
   ingredients: [String]
   instructions: Instructions
   time: Time
  }
 
  type Time {
    prep: Int
    cook: Int
    total: Int
  }

  type Instructions {
    prep: String
    steps: String
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
    recipeId: ID
    image: String
    createdAt: String
    recipeName: String
    ingredients: [String]
    instructions: [InstructionsData]
    time: [TimeData]
  }

  input InstructionsData {
    prep: String
    steps: String
  }




  input TimeData {
    prep: Int
    cook: Int
    total: Int
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
