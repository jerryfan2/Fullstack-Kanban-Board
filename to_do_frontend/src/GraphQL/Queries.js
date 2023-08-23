import {gql} from "@apollo/client";

export const GET_ALL_TO_DOS = gql`
    query {
        getAllToDos {
        id,
        description,
        priority,
        status,
        owner
        }
    }
`