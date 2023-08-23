import { gql } from "@apollo/client";

export const DELETE_TO_DO = gql`
    mutation DeleteToDo($id: ID!) {
        deleteToDo(id: $id) {
            id
        }
    }
`

export const CREATE_TO_DO = gql`
    mutation CreateToDo($description: String!, $priority: String!, $status: String!) {
        createToDo(toDo: {description: $description, priority: $priority, status: $status}) {
            id
        }
    }
`

export const UPDATE_TO_DO = gql`
    mutation UpdateToDo($id: ID!, $description: String, $priority: String, $status: String) {
        updateToDo(id: $id, description: $description, priority: $priority, status: $status) {
            id
        }
    }
`

export const SIGNUP_USER = gql`
    mutation SignUpUser($username: String!, $password: String!) {
        signUpUser(username: $username, password: $password) {
            username
        }
    }
`

export const LOGIN_USER = gql`
    mutation LoginUser($username: String!, $password: String!) {
        loginUser(username: $username, password: $password) {
            username
        }
    }
`

export const LOGOUT_USER = gql`
    mutation LogoutUser {
        logoutUser {
            username
        }
    }
`