import { useContext, useState } from "react";
import AuthInput from "../inputs/AuthInput";
import { loginvValidationSchema } from "../../validations/Authentication";
import AuthInputPassword from "../inputs/AuthInputPassword";
import { Link } from "react-router-dom";
import { loginUserApi } from "../../app/api/userApi";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import AuthContext from "../../context/AuthUser";

const LoginComponent = () => {
  const { refetch } = useContext(AuthContext);

  //states
  const [errors, setErrors] = useState({});
  const [loginForm, setLoginForm] = useState({
    input: "",
    password: "",
  });

  //react quires
  const { mutate, isPending } = useMutation({
    mutationFn: loginUserApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      refetch();
    },
  });

  //fundtions
  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginvValidationSchema.validate(loginForm, { abortEarly: false });
      mutate(loginForm);
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <div className="h-full w-full bg-ce rounded-lg p-5 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-ca">Login</h1>
        <p className="font-semibold text-sm text-cc">
          Rista helps you connect and share with the people in your life.
        </p>
      </div>
      <hr className="border border-cd" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <AuthInput
          id="login-input"
          label="Username or Email"
          type="text"
          name="input"
          placeholder="Username or Email"
          value={loginForm.input}
          onChange={handleChange}
          error={errors.input}
          disable={isPending}
        />

        <AuthInputPassword
          id={"login-password"}
          label={"Password"}
          type={"password"}
          name={"password"}
          placeholder="Password"
          value={loginForm.password}
          onChange={handleChange}
          error={errors.password}
          disable={isPending}
        />
        <p className="text-sm flex self-end">
          <Link
            to="/about/forgot-password"
            className="text-cc font-semibold hover:underline"
          >
            forgot password ?
          </Link>
        </p>

        <button
          type="submit"
          className="bg-cc text-white py-2 rounded-lg font-semibold transition-all ease-in-out duration-300 hover:bg-cb disabled:bg-gray-500"
          disabled={isPending}
        >
          {isPending ? "loading..." : "Login"}
        </button>
      </form>

      <hr className="border border-cd" />

      <p className="text-sm">
        {"Don't have account? "}
        <Link to="/register" className="text-cc font-semibold hover:underline">
          Register now
        </Link>
        .
      </p>
    </div>
  );
};

export default LoginComponent;
