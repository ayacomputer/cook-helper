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

export const CREATE_USER = gql``


export const SAVE_RECIPE = gql``


export const CREATE_RECIPE = gql``


export const REMOVE_RECIPE = gql``

export const DELETE_RECIPE = gql``
