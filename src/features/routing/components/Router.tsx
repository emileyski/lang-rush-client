import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import AppLayout from "src/ui/AppLayout";
import { SignIn, SignUp } from "src/features/authentication";

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-500">
      <h1 className="text-4xl font-bold text-white">Error 404</h1>
      <p className="text-2xl font-bold text-center text-white">
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
