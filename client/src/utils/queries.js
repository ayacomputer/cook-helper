import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
        _id
        username
        email
        bookCount
        savedRecipes {
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
    }
  }
`;

export const GET_RECIPES = gql`
  query GetRecipes {
    getRecipes {
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


export const GET_ONE_RECIPE = gql`
query GetOneRecipe($id: ID!) {
  getOneRecipe(_id: $id) {
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