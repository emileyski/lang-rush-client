import { ApolloProvider } from "@apollo/client";
import { client } from "./lib/apolloClient";
import Router from "./features/routing/components/Router";
import { useAppSelector } from "./store/store";
import { useEffect } from "react";

function App() {
  const isDark = useAppSelector((state) => state.theme.isDark);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);
  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  );
}

export default App;
