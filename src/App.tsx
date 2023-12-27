import { ApolloProvider } from "@apollo/client";
import { client } from "./lib/apolloClient";
import Router from "./features/routing/components/Router";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  );
}

export default App;
