import { gql } from '@apollo/client';

export const USER_LOGIN = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        recipeCount
        selectedRecipeIds 
      }
    }
  }`


export const SELECT_RECIPE = gql`
mutation SelectRecipe($id: String! ) {
    selectRecipe(_id: $id) {
      _id
      username
      email
      recipeCount
      selectedRecipeIds 
    }
  }`


export const CREATE_RECIPE = gql`
mutation CreateRecipe($input: RecipeInput!) {
    createRecipe(input: $input) {
      _id
      name
      image
      createdAt
      ingredients {
        name
        qty
      }
      steps
      totalTime
      serves
    }
  }`


export const REMOVE_RECIPE = gql`
mutation RemoveRecipe($id: ID!) {
    removeRecipe(_id: $id) {
      _id
      username
      email
      recipeCount
      selectedRecipeIds 
    }
  }`

export const DELETE_RECIPE = gql`
mutation DeleteRecipe($id: ID!) {
    deleteRecipe(_id: $id) {
      _id
      name
      image
      createdAt
      ingredients {
        name
        qty
      }
      steps
      totalTime
      serves
    }
  }`
