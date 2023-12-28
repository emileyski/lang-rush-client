import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import AppLayout from "src/ui/AppLayout";
import { SignIn, SignUp } from "src/features/authentication";
import { FoldersContainer } from "@features/folders";

const Error404 = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-red-500">
      <h1 className="text-4xl font-bold text-white">Error 404</h1>
      <p className="text-center text-2xl font-bold text-white">
        Page not found
      </p>
      <Link to="/" className="text-white underline">
        Go to home
      </Link>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error404 />,
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <FoldersContainer />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
