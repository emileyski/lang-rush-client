import Header from "./Header";
import Loader from "./Loader";
import { Outlet, useNavigation } from "react-router-dom";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr] overflow-hidden">
      {isLoading && <Loader />}

      <Header />

      <div className="overflow-auto transition-colors duration-300 dark:bg-[#252C48]">
        <main className="mx-auto max-w-[90%]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
