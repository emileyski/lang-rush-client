import React from "react";
import { Link } from "react-router-dom";

const SignIn: React.FC = () => {
  return (
    <form className="flex h-[90vh] justify-center">
      <div className="flex w-[400px]  flex-col justify-center gap-2">
        <h1 className="auth-header dark:auth-header-dark">Sign in</h1>
        <input
          type="text"
          className="auth-input dark:auth-input-dark"
          placeholder="Enter email"
        />
        <input
          type="password"
          placeholder="Enter password"
          className="auth-input dark:auth-input-dark"
        />
        <button
          type="submit"
          className="h-10 rounded-md bg-slate-700 text-white"
        >
          Sign in
        </button>
        <div className="w-[100%] self-start font-semibold text-slate-700">
          <span>Don't have an account?</span>

          <Link to="/signup" className="ml-3 font-semibold text-blue-700">
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
