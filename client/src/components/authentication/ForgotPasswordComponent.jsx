import { useState } from "react";
import AuthInput from "../inputs/AuthInput";
import { forgotPasswordValidationSchema } from "../../validations/Authentication";
import { Link } from "react-router-dom";
import { forgotPasswordUserApi } from "../../app/api/userApi";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

const ForgotPasswordComponent = () => {
  //states
  const [errors, setErrors] = useState({});
  const [forgotForm, setForgotForm] = useState({
    email: "",
  });

  //react quires
  const { mutate, isPending } = useMutation({
    mutationFn: forgotPasswordUserApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });

  //fundtions
  const handleChange = (e) => {
    setForgotForm({ ...forgotForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await forgotPasswordValidationSchema.validate(forgotForm, {
        abortEarly: false,
      });
      //   console.log(forgotForm);
      mutate(forgotForm);
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
        <h1 className="text-4xl font-bold text-ca">Forgot Password</h1>
        <p className="font-semibold text-sm text-cc">
          {
            "Provide your account's username or email for which you want to reset your password!"
          }
        </p>
      </div>
      <hr className="border border-cd" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <AuthInput
          id="forgot-email"
          label="Email"
          type="text"
          name="email"
          placeholder="Email"
          value={forgotForm.email}
          onChange={handleChange}
          error={errors.email}
          disable={isPending}
        />

        <button
          type="submit"
          className="bg-cc text-white py-2 rounded-lg font-semibold transition-all ease-in-out duration-300 hover:bg-cb disabled:bg-gray-500"
          disabled={isPending}
        >
          {isPending ? "loading..." : "Submit"}
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

export default ForgotPasswordComponent;
