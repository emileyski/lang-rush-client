import {
  GraphQLRequest,
  HttpLink,
  Observable,
  FetchResult,
  ApolloClient,
  ApolloLink,
  InMemoryCache,
} from "@apollo/client";
import { GraphQLError } from "graphql";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { JwtTokens } from "src/interfaces";
import { REFRESH_TOKENS } from "./operations";

function isRefreshRequest(operation: GraphQLRequest) {
  return operation.operationName === "refreshTokens";
}

function returnTokenDependingOnOperation(operation: GraphQLRequest) {
  if (isRefreshRequest(operation))
    return localStorage.getItem("refreshToken") || "";
  else return localStorage.getItem("accessToken") || "";
}

const httpLink = new HttpLink({ uri: import.meta.env.VITE_API_URL });

const authLink = setContext((operation, { headers }) => {
  const token = returnTokenDependingOnOperation(operation);

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        switch (err.message) {
          case "Unauthorized":
            // ignore 401 error for a refresh request
            // eslint-disable-next-line no-case-declarations
            const operationNames = ["refreshTokens", "signIn"];

            if (operationNames.includes(operation.operationName)) return;

            // eslint-disable-next-line no-case-declarations
            const observable = new Observable<
              FetchResult<Record<string, unknown>>
            >((observer) => {
              // used an annonymous function for using an async function
              (async () => {
                try {
                  const { accessToken } = await refreshToken();

                  if (!accessToken) {
                    throw new GraphQLError("Empty AccessToken");
                  }

                  // Retry the failed request
                  const subscriber = {
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer),
                  };

                  forward(operation).subscribe(subscriber);
                } catch (err) {
                  observer.error(err);
                }
              })();
            });

            return observable;
        }
      }
    }

    if (networkError) console.log(`[Network error]: ${networkError}`);
  },
);

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

const refreshToken = async () => {
  try {
    const refreshResolverResponse = await client.mutate<{
      refreshTokens: JwtTokens;
    }>({
      mutation: REFRESH_TOKENS,
    });

    const accessToken = refreshResolverResponse.data?.refreshTokens.accessToken;
    const refreshToken =
      refreshResolverResponse.data?.refreshTokens.refreshToken;

    localStorage.setItem("accessToken", accessToken || "");
    localStorage.setItem("refreshToken", refreshToken || "");

    return { accessToken, refreshToken };
  } catch (err) {
    console.log(err);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    throw err;
  }
};
