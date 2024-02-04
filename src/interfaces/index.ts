import { ApolloError } from "@apollo/client";
import { GraphQLError } from "graphql";

export interface CustomApolloError extends Omit<ApolloError, "graphQLErrors"> {
  graphQLErrors: CustomGraphQLError[];
}

export interface CustomGraphQLError extends Omit<GraphQLError, "extensions"> {
  extensions: {
    code: string;
    stacktrace: string[];
    originalError: {
      message: Array<string> | string;
      error: string;
      statusCode: number;
    };
  };
}

export interface JwtTokens {
  accessToken: string;
  refreshToken: string;
}
