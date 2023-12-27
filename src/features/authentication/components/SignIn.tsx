import React from "react";
import { Link } from "react-router-dom";

const SignIn: React.FC = () => {
  return (
    <form className="flex justify-center h-[90vh]">
      <div className="flex flex-col gap-2 justify-center w-[400px]">
        <h1 className="text-slate-700 font-semibold text-3xl self-start">
          Sign in
        </h1>
        <input
          type="text"
          className="border border-slate-700 rounded-md h-10 px-2"
          placeholder="Enter email"
        />
        <input
          type="password"
          placeholder="Enter password"
          className="border border-slate-700 rounded-md h-10 px-2"
        />
        <button
          type="submit"
          className="bg-slate-700 text-white rounded-md h-10"
        >
          Sign in
        </button>
        <div className="text-slate-700 font-semibold self-start w-[100%]">
          <span>Don't have an account?</span>

          <Link to="/signup" className="text-blue-700 font-semibold ml-3">
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
