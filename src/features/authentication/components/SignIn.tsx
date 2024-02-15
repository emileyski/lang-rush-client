import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSignInMutation } from "src/genetated/types";
import Loader from "src/ui/Loader";
import { setAccessToken, setRefreshToken } from "src/utils";

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [signin, { loading }] = useSignInMutation({
    onCompleted: (data) => {
      setAccessToken(data.signIn.accessToken);
      setRefreshToken(data.signIn.refreshToken);
      navigate("/");
    },
    onError: (err) => {
      const message = err.message;

      if (typeof message === "string") {
        setErrorMessage(message);
      } else {
        setErrorMessage("Something went wrong");
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");

    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    await signin({
      variables: {
        email,
        password,
      },
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <form
      className="flex h-[90vh] justify-center"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="flex w-[400px]  flex-col justify-center gap-2">
        <h1 className="auth-header">Sign in</h1>
        <input
          type="text"
          className="auth-input"
          name="email"
          placeholder="Enter email"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          className="auth-input"
        />
        {errorMessage && (
          <span className="self-start font-semibold text-red-500">
            {errorMessage}
          </span>
        )}
        <button
          type="submit"
          className="h-10 rounded-md bg-[#333C66] font-bold uppercase text-white"
        >
          Sign in
        </button>
        <div className="w-[100%] self-start">
          <span className="auth-label cursor-pointer">
            Don't have an account?
          </span>

          <Link to="/signup" className="auth-link">
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
