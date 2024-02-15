import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lang, useSignUpMutation } from "src/genetated/types";
import Loader from "src/ui/Loader";
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

  if (loading) {
    return <Loader />;
  }

  return (
    <form
      className="flex h-[90vh] justify-center"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="flex w-[400px] flex-col justify-center gap-2">
        <h1 className="auth-header">Sign up</h1>
        <input
          type="text"
          name="email"
          className="auth-input"
          placeholder="Enter email"
        />
        {errorMessages.emailError && (
          <span className="self-start font-semibold text-red-500">
            {errorMessages.emailError}
          </span>
        )}
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter password"
          className="auth-input"
        />
        {errorMessages.passwordError && (
          <span className="self-start font-semibold text-red-500">
            {errorMessages.passwordError}
          </span>
        )}
        <input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm password"
          className="auth-input"
        />
        <div className="flex items-center gap-2">
          <input
            id="showPassword"
            type="checkbox"
            name="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />
          <label className="auth-label" htmlFor="showPassword">
            Show password
          </label>
        </div>
        {errorMessages.confirmPasswordError && (
          <span className="self-start font-semibold text-red-500">
            {errorMessages.confirmPasswordError}
          </span>
        )}

        <label className="auth-label" htmlFor="nativeLang">
          Choose your native language
        </label>
        <select id="nativeLang" className="auth-select" defaultValue={Lang.Uk}>
          {nativeLanguages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>

        <button
          disabled={loading}
          type="submit"
          className="h-10 rounded-md bg-[#333C66] font-bold uppercase text-white"
        >
          Sign up
        </button>
        <div className="w-[100%] self-start font-semibold text-slate-700">
          <span className="auth-label">Already have an account?</span>

          <Link to="/signin" className="auth-link">
            Sign in
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
