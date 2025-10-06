import { useForm } from "react-hook-form";
import { useAuth } from "../utils/AuthContext";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ErrorForm from "../components/ErrorForm";
import ErrorComponent from "../components/ErrorComponent";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { Spinner } from "flowbite-react";

const RegisterPage = () => {
  const { handleUserRegister, user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const handleError = (error) => {
    const errorMessage =
      "Invalid email or password. Please check your credentials.";
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <ErrorComponent message={errorMessage} />
        </div>
      ),
      {
        duration: 5000,
        position: "top-center",
      }
    );
    console.error("Login attempt failed:", error);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await handleUserRegister(data);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          React Chat
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className=" border border-gray-800 text-white  block w-full p-2.5 bg-gray-700  rounded-lg focus:ring-(--borderColor2) focus:border-(--borderColor2) placeholder-gray-400 focus:outline-0 "
                  autoComplete="home email webauthn"
                  placeholder="name@company.com"
                  {...register("email", {
                    validate: {
                      hasEmail: (value) =>
                        /^\S+@\S+$/i.test(value) || "Not Valid Email.",
                    },
                  })}
                />
                {errors.email && (
                  <ErrorForm errorMessage={errors.email.message} />
                )}
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className=" border border-gray-800 text-white  block w-full p-2.5 bg-gray-700  rounded-lg focus:ring-(--borderColor2) focus:border-(--borderColor2) placeholder-gray-400 focus:outline-0 "
                  placeholder="Your Display Name"
                  autoComplete="name"
                  {...register("name", {
                    required: "Username is required!", // يجب إدخاله
                    maxLength: { value: 20, message: "Max 20 characters" }, // الحد الأقصى للطول
                    minLength: { value: 3, message: "Min 3 characters" }, // الحد الأدنى للطول
                  })}
                />
                {errors.name && (
                  <ErrorForm errorMessage={errors.name.message} />
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className=" border border-gray-800 text-white  block w-full p-2.5 bg-gray-700  rounded-lg focus:ring-(--borderColor2) focus:border-(--borderColor2) placeholder-gray-400 focus:outline-0 "
                  autoComplete="new-password webauthn"
                  {...register("password", {
                    required: "Where's the password???",
                    validate: {
                      hasUppercase: (value) =>
                        /(?=.*[A-Z])/.test(value) ||
                        "Must contain at least one uppercase letter (A-Z)",
                      hasLowercase: (value) =>
                        /(?=.*[a-z])/.test(value) ||
                        "Must contain at least one lowercase letter (a-z)",
                      hasNumber: (value) =>
                        /(?=.*[0-9])/.test(value) ||
                        "Must contain at least one number (0-9)",
                      hasSymbol: (value) =>
                        /(?=.*?[#?!@$%^&*-])/.test(value) ||
                        "Must contain at least one symbol (#?!@$%^&*-)",
                      hasEightNumber: (value) =>
                        /(?=^.{8,}$)/.test(value) ||
                        "Must have at least 8 characters",
                    },
                  })}
                />

                {errors.password && (
                  <ErrorForm errorMessage={errors.password.message} />
                )}
              </div>
              <div>
                <label
                  htmlFor="passwordConfirm"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="passwordConfirm"
                  id="passwordConfirm"
                  placeholder="••••••••"
                  className=" border border-gray-800 text-white  block w-full p-2.5 bg-gray-700  rounded-lg focus:ring-(--borderColor2) focus:border-(--borderColor2) placeholder-gray-400 focus:outline-0 "
                  autoComplete="new-password webauthn"
                  {...register("passwordConfirm", {
                    required: "Please confirm your password.",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match!",
                  })}
                />

                {errors.passwordConfirm && (
                  <ErrorForm errorMessage={errors.passwordConfirm.message} />
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all ${
                  isLoading
                    ? "bg-pink-400 cursor-not-allowed"
                    : "bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300"
                } `}
              >
                {isLoading && (
                  <Spinner className="mr-2 h-4 w-4 fill-white inline-block" />
                )}
                {isLoading ? "Signing up..." : "Sign up"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="font-medium text-pink-600 hover:underline dark:text-pink-500"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default RegisterPage;
