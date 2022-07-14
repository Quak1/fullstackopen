import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

export const ALL_BOOKS = gql`
  query allBooks {
    allBooks {
      title
      published
      author
      id
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      author
      id
    }
  }
`;

export const EDIT_BORN_YEAR = gql`
  mutation editBornYear($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      born
      id
    }
  }
`;
