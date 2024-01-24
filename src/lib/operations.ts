import { gql } from "@apollo/client";

export const REFRESH_TOKENS = gql`
  mutation refreshTokens {
    refreshTokens {
      accessToken
      refreshToken
    }
  }
`;

export const LOGIN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(data: { email: $email, password: $password }) {
      accessToken
      refreshToken
    }
  }
`;

export const SIGNUP = gql`
  enum Lang {
    DE
    EN
    PL
    UK
  }
  mutation signUp($email: String!, $password: String!, $nativeLang: Lang!) {
    signUp(
      data: { email: $email, password: $password, nativeLang: $nativeLang }
    ) {
      accessToken
      refreshToken
    }
  }
`;

export const LOGOUT = gql`
  mutation logout {
    logOut
  }
`;

export const GET_FOLDERS = gql`
  query folders {
    folders {
      id
      name
    }
  }
`;

export const CREATE_FOLDER = gql`
  mutation createFolder($name: String!) {
    createFolder(data: { name: $name }) {
      id
      name
    }
  }
`;

export const UPDATE_FOLDER = gql`
  mutation updateFolder($id: String!, $name: String!) {
    updateFolder(id: $id, data: { name: $name }) {
      id
      name
    }
  }
`;

export const DELETE_FOLDER = gql`
  mutation deleteFolder($id: String!) {
    deleteFolder(id: $id)
  }
`;

export const GET_FOLDER = gql`
  query folder($id: String!) {
    folder(id: $id) {
      id
      name
      words {
        id
        word
      }
    }
  }
`;

export const GET_WORD = gql`
  query word($id: String!) {
    word(id: $id) {
      id
      word
      definition
      form
      otherAdjs
      otherAdvs
      otherNouns
      otherVerbs
      sentences
      translation
    }
  }
`;

export const CREATE_WORD = gql`
  mutation createWord(
    $definition: String!
    $folderId: ID!
    $form: WordForm!
    $otherAdjs: [String!]
    $otherAdvs: [String!]
    $otherNouns: [String!]
    $otherVerbs: [String!]
    $sentences: [String!]!
    $translation: String!
    $word: String!
  ) {
    createWord(
      data: {
        definition: $definition
        folderId: $folderId
        form: $form
        otherAdjs: $otherAdjs
        otherAdvs: $otherAdvs
        otherNouns: $otherNouns
        otherVerbs: $otherVerbs
        sentences: $sentences
        translation: $translation
        word: $word
      }
    ) {
      id
    }
  }
`;

export const DELETE_WORD = gql`
  mutation deleteWord($id: String!) {
    deleteWord(id: $id)
  }
`;
