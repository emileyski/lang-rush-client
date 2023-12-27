import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lang, useSignUpMutation } from "src/genetated/types";
import { setAccessToken, setRefreshToken } from "src/utils";
import { validateEmail, validatePassword } from "src/utils/validation";

const nativeLanguages: { label: string; value: Lang }[] = [
  {
    label: "Ukrainian",
    value: Lang.Uk,
  },
  {
    label: "German",
    value: Lang.De,
  },
  {
    label: "Polish",
    value: Lang.Pl,
  },
];

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState<{
    passwordError?: string;
    emailError?: string;
    confirmPasswordError?: string;
    signupError?: string;
  }>({
    passwordError: "",
    emailError: "",
    confirmPasswordError: "",
    signupError: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  // const [errors, setErrors] = useState<string[]>([]);

  const [signUp, { loading }] = useSignUpMutation({
    onCompleted: (data) => {
      setAccessToken(data.signUp.accessToken);
      setRefreshToken(data.signUp.refreshToken);
      navigate("/");
    },
    onError: (err) => {
      const message = err.message;

      if (typeof message === "string") {
        setErrorMessages((prev) => ({ ...prev, signupError: message }));
      }
      // else if (Array.isArray(message)) {
      //   setErrorMessages(message);
      // }
      else {
        setErrorMessages((prev) => ({
          ...prev,
          signupError: "Something went wrong",
        }));
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessages({});

    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError =
      password !== e.currentTarget.confirmPassword.value
        ? "Passwords don't match"
        : "";

    if (emailError || passwordError || confirmPasswordError) {
      setErrorMessages({
        emailError: emailError || undefined,
        passwordError: passwordError || undefined,
        confirmPasswordError: confirmPasswordError || undefined,
      });

      return;
    }

    await signUp({
      variables: {
        email,
        password,
        nativeLang: Lang.Uk,
      },
    });
  };

  return (
    <form
      className="flex justify-center h-[90vh]"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="flex flex-col gap-2 justify-center w-[400px]">
        <h1 className="text-slate-700 font-semibold text-3xl self-start">
          Sign up
        </h1>
        <input
          type="text"
          name="email"
          className="border border-slate-700 rounded-md h-10 px-2"
          placeholder="Enter email"
        />
        {errorMessages.emailError && (
          <span className="text-red-500 font-semibold self-start">
            {errorMessages.emailError}
          </span>
        )}
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter password"
          className="border border-slate-700 rounded-md h-10 px-2"
        />
        {errorMessages.passwordError && (
          <span className="text-red-500 font-semibold self-start">
            {errorMessages.passwordError}
          </span>
        )}
        <input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm password"
          className="border border-slate-700 rounded-md h-10 px-2"
        />
        <div className="flex items-center gap-2">
          <input
            id="showPassword"
            type="checkbox"
            name="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />
          <label
            className="text-slate-700 font-semibold self-start"
            htmlFor="showPassword"
          >
            Show password
          </label>
        </div>
        {errorMessages.confirmPasswordError && (
          <span className="text-red-500 font-semibold self-start">
            {errorMessages.confirmPasswordError}
          </span>
        )}

        <span className="text-slate-700 font-semibold self-start">
          Choose your native language
        </span>
        <select
          className="border border-slate-700 rounded-md h-10 px-2"
          defaultValue={Lang.Uk}
        >
          {nativeLanguages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>

        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 text-white rounded-md h-10"
        >
          Sign up
        </button>
        <div className="text-slate-700 font-semibold self-start w-[100%]">
          <span>Already have an account?</span>

          <Link to="/signin" className="text-blue-700 font-semibold ml-3">
            Sign in
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
