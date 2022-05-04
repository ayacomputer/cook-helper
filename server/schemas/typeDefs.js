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
   recipeId: ID!
   image: String!
   recipeName: String!
   ingredients: [String]!
   instructions: {
     prep: String!
     steps: [String]!
   }
   time: {
     prep: Int
     cook: Int
     total:Int
   }
   createdAt: String
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
   
  input RecipeInput {
    recipeId: ID!
    image: String!
    recipeName: String!
    ingredients: [String]!
    instructions: {
      prep: String!
      steps: [String]!
    }
    time: {
      prep: Int
      cook: Int
      total:Int
    }
   }
 
   type Mutation {
    login( email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    saveRecipe( input: RecipeData! ): User
    removeRecipe(recipeId: ID!): User
 
}

`;

module.exports = typeDefs;
