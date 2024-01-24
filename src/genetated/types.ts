import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Answer = {
  answer: Scalars['String']['input'];
  wordId: Scalars['String']['input'];
};

export type AnswersInput = {
  answers: Array<Answer>;
  folderId: Scalars['String']['input'];
  quizType: QuizType;
};

export type Auth = {
  __typename?: 'Auth';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type CreateFolderInput = {
  name: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  nativeLang: Lang;
  password: Scalars['String']['input'];
  role?: InputMaybe<Role>;
};

export type CreateWordInput = {
  definition: Scalars['String']['input'];
  folderId: Scalars['ID']['input'];
  form: WordForm;
  otherAdjs?: InputMaybe<Array<Scalars['String']['input']>>;
  otherAdvs?: InputMaybe<Array<Scalars['String']['input']>>;
  otherNouns?: InputMaybe<Array<Scalars['String']['input']>>;
  otherVerbs?: InputMaybe<Array<Scalars['String']['input']>>;
  sentences: Array<Scalars['String']['input']>;
  translation: Scalars['String']['input'];
  word: Scalars['String']['input'];
};

export type Folder = {
  __typename?: 'Folder';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  words?: Maybe<Array<Word>>;
};

export type GetUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

export type GetUsersInput = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<WhereUserInput>;
};

export enum Lang {
  De = 'DE',
  Fr = 'FR',
  Pl = 'PL',
  Uk = 'UK'
}

export type Mutation = {
  __typename?: 'Mutation';
  answers: Array<Word>;
  createFolder: Folder;
  createUser?: Maybe<User>;
  createWord: Word;
  deleteFolder?: Maybe<Scalars['Boolean']['output']>;
  deleteUser?: Maybe<Scalars['Boolean']['output']>;
  deleteWord?: Maybe<Scalars['Boolean']['output']>;
  logOut?: Maybe<Scalars['Boolean']['output']>;
  refreshTokens: Auth;
  signIn: Auth;
  signUp: Auth;
  updateFolder: Folder;
  updateUser?: Maybe<User>;
  updateWord: Word;
};


export type MutationAnswersArgs = {
  data: AnswersInput;
};


export type MutationCreateFolderArgs = {
  data: CreateFolderInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationCreateWordArgs = {
  data: CreateWordInput;
};


export type MutationDeleteFolderArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  where: GetUserInput;
};


export type MutationDeleteWordArgs = {
  id: Scalars['String']['input'];
};


export type MutationSignInArgs = {
  data: SignInInput;
};


export type MutationSignUpArgs = {
  data: SignUpInput;
};


export type MutationUpdateFolderArgs = {
  data: UpdateFolderInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  where: GetUserInput;
};


export type MutationUpdateWordArgs = {
  data: UpdateWordInput;
  id: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  folder: Folder;
  folders: Array<Folder>;
  me: User;
  questions: Quiz;
  translateWord: Scalars['String']['output'];
  user: User;
  users: Array<User>;
  word: Word;
};


export type QueryFolderArgs = {
  id: Scalars['String']['input'];
};


export type QueryQuestionsArgs = {
  data: QuestionsInput;
};


export type QueryTranslateWordArgs = {
  data: TranslateWordInput;
};


export type QueryUserArgs = {
  where: GetUserInput;
};


export type QueryUsersArgs = {
  params: GetUsersInput;
};


export type QueryWordArgs = {
  id: Scalars['String']['input'];
};

export type Question = {
  __typename?: 'Question';
  question: Scalars['String']['output'];
  wordForm: WordForm;
  wordId: Scalars['String']['output'];
};

export type QuestionsInput = {
  folderId: Scalars['String']['input'];
  quizType: QuizType;
};

export type Quiz = {
  __typename?: 'Quiz';
  folderId: Scalars['String']['output'];
  questions: Array<Question>;
  type: QuizType;
};

export enum QuizType {
  DefinitionWord = 'DEFINITION_WORD',
  WordTranslation = 'WORD_TRANSLATION'
}

export enum Role {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER'
}

export type SignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpInput = {
  email: Scalars['String']['input'];
  nativeLang: Lang;
  password: Scalars['String']['input'];
};

export type TranslateWordInput = {
  word: Scalars['String']['input'];
};

export type UpdateFolderInput = {
  name: Scalars['String']['input'];
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  nativeLang?: InputMaybe<Lang>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Role>;
  token?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateWordInput = {
  definition: Scalars['String']['input'];
  folderId: Scalars['ID']['input'];
  form: WordForm;
  otherAdjs?: InputMaybe<Array<Scalars['String']['input']>>;
  otherAdvs?: InputMaybe<Array<Scalars['String']['input']>>;
  otherNouns?: InputMaybe<Array<Scalars['String']['input']>>;
  otherVerbs?: InputMaybe<Array<Scalars['String']['input']>>;
  sentences: Array<Scalars['String']['input']>;
  translation: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  nativeLang: Lang;
  role: Role;
  updatedAt: Scalars['DateTime']['output'];
};

export type WhereUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Word = {
  __typename?: 'Word';
  createdAt: Scalars['DateTime']['output'];
  definition: Scalars['String']['output'];
  form: WordForm;
  id: Scalars['ID']['output'];
  otherAdjs: Array<Scalars['String']['output']>;
  otherAdvs: Array<Scalars['String']['output']>;
  otherNouns: Array<Scalars['String']['output']>;
  otherVerbs: Array<Scalars['String']['output']>;
  progress: Scalars['Int']['output'];
  sentences: Array<Scalars['String']['output']>;
  translation: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  word: Scalars['String']['output'];
};

export enum WordForm {
  Adjective = 'ADJECTIVE',
  Adverb = 'ADVERB',
  Noun = 'NOUN',
  Verb = 'VERB'
}

export type RefreshTokensMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokensMutation = { __typename?: 'Mutation', refreshTokens: { __typename?: 'Auth', accessToken: string, refreshToken: string } };

export type SignInMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'Auth', accessToken: string, refreshToken: string } };

export type SignUpMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  nativeLang: Lang;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'Auth', accessToken: string, refreshToken: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logOut?: boolean | null };

export type FoldersQueryVariables = Exact<{ [key: string]: never; }>;


export type FoldersQuery = { __typename?: 'Query', folders: Array<{ __typename?: 'Folder', id: string, name: string }> };

export type CreateFolderMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateFolderMutation = { __typename?: 'Mutation', createFolder: { __typename?: 'Folder', id: string, name: string } };

export type UpdateFolderMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateFolderMutation = { __typename?: 'Mutation', updateFolder: { __typename?: 'Folder', id: string, name: string } };

export type DeleteFolderMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteFolderMutation = { __typename?: 'Mutation', deleteFolder?: boolean | null };

export type FolderQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type FolderQuery = { __typename?: 'Query', folder: { __typename?: 'Folder', id: string, name: string, words?: Array<{ __typename?: 'Word', id: string, word: string }> | null } };

export type WordQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type WordQuery = { __typename?: 'Query', word: { __typename?: 'Word', id: string, word: string, definition: string, form: WordForm, otherAdjs: Array<string>, otherAdvs: Array<string>, otherNouns: Array<string>, otherVerbs: Array<string>, sentences: Array<string>, translation: string } };

export type CreateWordMutationVariables = Exact<{
  definition: Scalars['String']['input'];
  folderId: Scalars['ID']['input'];
  form: WordForm;
  otherAdjs?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  otherAdvs?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  otherNouns?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  otherVerbs?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  sentences: Array<Scalars['String']['input']> | Scalars['String']['input'];
  translation: Scalars['String']['input'];
  word: Scalars['String']['input'];
}>;


export type CreateWordMutation = { __typename?: 'Mutation', createWord: { __typename?: 'Word', id: string } };

export type DeleteWordMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteWordMutation = { __typename?: 'Mutation', deleteWord?: boolean | null };


export const RefreshTokensDocument = gql`
    mutation refreshTokens {
  refreshTokens {
    accessToken
    refreshToken
  }
}
    `;
export type RefreshTokensMutationFn = Apollo.MutationFunction<RefreshTokensMutation, RefreshTokensMutationVariables>;

/**
 * __useRefreshTokensMutation__
 *
 * To run a mutation, you first call `useRefreshTokensMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokensMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokensMutation, { data, loading, error }] = useRefreshTokensMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshTokensMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokensMutation, RefreshTokensMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokensMutation, RefreshTokensMutationVariables>(RefreshTokensDocument, options);
      }
export type RefreshTokensMutationHookResult = ReturnType<typeof useRefreshTokensMutation>;
export type RefreshTokensMutationResult = Apollo.MutationResult<RefreshTokensMutation>;
export type RefreshTokensMutationOptions = Apollo.BaseMutationOptions<RefreshTokensMutation, RefreshTokensMutationVariables>;
export const SignInDocument = gql`
    mutation signIn($email: String!, $password: String!) {
  signIn(data: {email: $email, password: $password}) {
    accessToken
    refreshToken
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = gql`
    mutation signUp($email: String!, $password: String!, $nativeLang: Lang!) {
  signUp(data: {email: $email, password: $password, nativeLang: $nativeLang}) {
    accessToken
    refreshToken
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      nativeLang: // value for 'nativeLang'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logOut
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const FoldersDocument = gql`
    query folders {
  folders {
    id
    name
  }
}
    `;

/**
 * __useFoldersQuery__
 *
 * To run a query within a React component, call `useFoldersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFoldersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFoldersQuery({
 *   variables: {
 *   },
 * });
 */
export function useFoldersQuery(baseOptions?: Apollo.QueryHookOptions<FoldersQuery, FoldersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FoldersQuery, FoldersQueryVariables>(FoldersDocument, options);
      }
export function useFoldersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FoldersQuery, FoldersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FoldersQuery, FoldersQueryVariables>(FoldersDocument, options);
        }
export function useFoldersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FoldersQuery, FoldersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FoldersQuery, FoldersQueryVariables>(FoldersDocument, options);
        }
export type FoldersQueryHookResult = ReturnType<typeof useFoldersQuery>;
export type FoldersLazyQueryHookResult = ReturnType<typeof useFoldersLazyQuery>;
export type FoldersSuspenseQueryHookResult = ReturnType<typeof useFoldersSuspenseQuery>;
export type FoldersQueryResult = Apollo.QueryResult<FoldersQuery, FoldersQueryVariables>;
export const CreateFolderDocument = gql`
    mutation createFolder($name: String!) {
  createFolder(data: {name: $name}) {
    id
    name
  }
}
    `;
export type CreateFolderMutationFn = Apollo.MutationFunction<CreateFolderMutation, CreateFolderMutationVariables>;

/**
 * __useCreateFolderMutation__
 *
 * To run a mutation, you first call `useCreateFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFolderMutation, { data, loading, error }] = useCreateFolderMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateFolderMutation(baseOptions?: Apollo.MutationHookOptions<CreateFolderMutation, CreateFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFolderMutation, CreateFolderMutationVariables>(CreateFolderDocument, options);
      }
export type CreateFolderMutationHookResult = ReturnType<typeof useCreateFolderMutation>;
export type CreateFolderMutationResult = Apollo.MutationResult<CreateFolderMutation>;
export type CreateFolderMutationOptions = Apollo.BaseMutationOptions<CreateFolderMutation, CreateFolderMutationVariables>;
export const UpdateFolderDocument = gql`
    mutation updateFolder($id: String!, $name: String!) {
  updateFolder(id: $id, data: {name: $name}) {
    id
    name
  }
}
    `;
export type UpdateFolderMutationFn = Apollo.MutationFunction<UpdateFolderMutation, UpdateFolderMutationVariables>;

/**
 * __useUpdateFolderMutation__
 *
 * To run a mutation, you first call `useUpdateFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFolderMutation, { data, loading, error }] = useUpdateFolderMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateFolderMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFolderMutation, UpdateFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFolderMutation, UpdateFolderMutationVariables>(UpdateFolderDocument, options);
      }
export type UpdateFolderMutationHookResult = ReturnType<typeof useUpdateFolderMutation>;
export type UpdateFolderMutationResult = Apollo.MutationResult<UpdateFolderMutation>;
export type UpdateFolderMutationOptions = Apollo.BaseMutationOptions<UpdateFolderMutation, UpdateFolderMutationVariables>;
export const DeleteFolderDocument = gql`
    mutation deleteFolder($id: String!) {
  deleteFolder(id: $id)
}
    `;
export type DeleteFolderMutationFn = Apollo.MutationFunction<DeleteFolderMutation, DeleteFolderMutationVariables>;

/**
 * __useDeleteFolderMutation__
 *
 * To run a mutation, you first call `useDeleteFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFolderMutation, { data, loading, error }] = useDeleteFolderMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteFolderMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFolderMutation, DeleteFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFolderMutation, DeleteFolderMutationVariables>(DeleteFolderDocument, options);
      }
export type DeleteFolderMutationHookResult = ReturnType<typeof useDeleteFolderMutation>;
export type DeleteFolderMutationResult = Apollo.MutationResult<DeleteFolderMutation>;
export type DeleteFolderMutationOptions = Apollo.BaseMutationOptions<DeleteFolderMutation, DeleteFolderMutationVariables>;
export const FolderDocument = gql`
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

/**
 * __useFolderQuery__
 *
 * To run a query within a React component, call `useFolderQuery` and pass it any options that fit your needs.
 * When your component renders, `useFolderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFolderQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFolderQuery(baseOptions: Apollo.QueryHookOptions<FolderQuery, FolderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FolderQuery, FolderQueryVariables>(FolderDocument, options);
      }
export function useFolderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FolderQuery, FolderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FolderQuery, FolderQueryVariables>(FolderDocument, options);
        }
export function useFolderSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FolderQuery, FolderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FolderQuery, FolderQueryVariables>(FolderDocument, options);
        }
export type FolderQueryHookResult = ReturnType<typeof useFolderQuery>;
export type FolderLazyQueryHookResult = ReturnType<typeof useFolderLazyQuery>;
export type FolderSuspenseQueryHookResult = ReturnType<typeof useFolderSuspenseQuery>;
export type FolderQueryResult = Apollo.QueryResult<FolderQuery, FolderQueryVariables>;
export const WordDocument = gql`
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

/**
 * __useWordQuery__
 *
 * To run a query within a React component, call `useWordQuery` and pass it any options that fit your needs.
 * When your component renders, `useWordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWordQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useWordQuery(baseOptions: Apollo.QueryHookOptions<WordQuery, WordQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WordQuery, WordQueryVariables>(WordDocument, options);
      }
export function useWordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WordQuery, WordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WordQuery, WordQueryVariables>(WordDocument, options);
        }
export function useWordSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<WordQuery, WordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<WordQuery, WordQueryVariables>(WordDocument, options);
        }
export type WordQueryHookResult = ReturnType<typeof useWordQuery>;
export type WordLazyQueryHookResult = ReturnType<typeof useWordLazyQuery>;
export type WordSuspenseQueryHookResult = ReturnType<typeof useWordSuspenseQuery>;
export type WordQueryResult = Apollo.QueryResult<WordQuery, WordQueryVariables>;
export const CreateWordDocument = gql`
    mutation createWord($definition: String!, $folderId: ID!, $form: WordForm!, $otherAdjs: [String!], $otherAdvs: [String!], $otherNouns: [String!], $otherVerbs: [String!], $sentences: [String!]!, $translation: String!, $word: String!) {
  createWord(
    data: {definition: $definition, folderId: $folderId, form: $form, otherAdjs: $otherAdjs, otherAdvs: $otherAdvs, otherNouns: $otherNouns, otherVerbs: $otherVerbs, sentences: $sentences, translation: $translation, word: $word}
  ) {
    id
  }
}
    `;
export type CreateWordMutationFn = Apollo.MutationFunction<CreateWordMutation, CreateWordMutationVariables>;

/**
 * __useCreateWordMutation__
 *
 * To run a mutation, you first call `useCreateWordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWordMutation, { data, loading, error }] = useCreateWordMutation({
 *   variables: {
 *      definition: // value for 'definition'
 *      folderId: // value for 'folderId'
 *      form: // value for 'form'
 *      otherAdjs: // value for 'otherAdjs'
 *      otherAdvs: // value for 'otherAdvs'
 *      otherNouns: // value for 'otherNouns'
 *      otherVerbs: // value for 'otherVerbs'
 *      sentences: // value for 'sentences'
 *      translation: // value for 'translation'
 *      word: // value for 'word'
 *   },
 * });
 */
export function useCreateWordMutation(baseOptions?: Apollo.MutationHookOptions<CreateWordMutation, CreateWordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWordMutation, CreateWordMutationVariables>(CreateWordDocument, options);
      }
export type CreateWordMutationHookResult = ReturnType<typeof useCreateWordMutation>;
export type CreateWordMutationResult = Apollo.MutationResult<CreateWordMutation>;
export type CreateWordMutationOptions = Apollo.BaseMutationOptions<CreateWordMutation, CreateWordMutationVariables>;
export const DeleteWordDocument = gql`
    mutation deleteWord($id: String!) {
  deleteWord(id: $id)
}
    `;
export type DeleteWordMutationFn = Apollo.MutationFunction<DeleteWordMutation, DeleteWordMutationVariables>;

/**
 * __useDeleteWordMutation__
 *
 * To run a mutation, you first call `useDeleteWordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWordMutation, { data, loading, error }] = useDeleteWordMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteWordMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWordMutation, DeleteWordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteWordMutation, DeleteWordMutationVariables>(DeleteWordDocument, options);
      }
export type DeleteWordMutationHookResult = ReturnType<typeof useDeleteWordMutation>;
export type DeleteWordMutationResult = Apollo.MutationResult<DeleteWordMutation>;
export type DeleteWordMutationOptions = Apollo.BaseMutationOptions<DeleteWordMutation, DeleteWordMutationVariables>;