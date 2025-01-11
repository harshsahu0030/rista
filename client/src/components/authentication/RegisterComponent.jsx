import { useState } from "react";
import AuthInput from "../inputs/AuthInput";
import { registerValidationSchema } from "../../validations/Authentication";
import AuthInputPassword from "../inputs/AuthInputPassword";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerUserApi } from "../../app/api/userApi";
import toast from "react-hot-toast";

const RegisterComponent = () => {
  const navigate = useNavigate();

  //states
  const [errors, setErrors] = useState({});
  const [registerForm, setregisterForm] = useState({
    name: "",
    username: "",
    email: "",
    birthday: "",
    password: "",
  });

  //react quires
  const { mutate, isPending } = useMutation({
    mutationFn: registerUserApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      if (data?.data?.otpId) {
        navigate(`/register/${data && data?.data?.otpId}`);
      } else {
        toast("Internal Server Error! Please try again");
      }
    },
  });

  //fundtions
  const handleChange = (e) => {
    setregisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerValidationSchema.validate(registerForm, {
        abortEarly: false,
      });
      mutate(registerForm);
      console.log(registerForm);
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
        <h1 className="text-4xl font-bold text-ca">Register</h1>
        <p className="font-semibold text-sm text-cc">
          Rista helps you connect and share with the people in your life.
        </p>
      </div>
      <hr className="border border-cd" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <AuthInput
          id="login-name"
          label="Name"
          type="text"
          name="name"
          placeholder="Name"
          value={registerForm.name}
          onChange={handleChange}
          error={errors.name}
          disable={isPending}
        />
        <AuthInput
          id="login-username"
          label="Username"
          type="text"
          name="username"
          placeholder="Username"
          value={registerForm.username}
          onChange={handleChange}
          error={errors.username}
          disable={isPending}
        />
        <AuthInput
          id="login-email"
          label="Email"
          type="text"
          name="email"
          placeholder="Email"
          value={registerForm.email}
          onChange={handleChange}
          error={errors.email}
          disable={isPending}
        />

        <AuthInput
          id="login-birthday"
          label="Birthday"
          type="date"
          name="birthday"
          placeholder="birthday"
          value={registerForm.birthday}
          onChange={handleChange}
          error={errors.birthday}
          disable={isPending}
        />

        <AuthInputPassword
          id={"login-password"}
          label={"Password"}
          type={"password"}
          name={"password"}
          placeholder="Password"
          value={registerForm.password}
          onChange={handleChange}
          error={errors.password}
          disable={isPending}
        />

        <button
          type="submit"
          className="bg-cc text-white py-2 rounded-lg font-semibold transition-all ease-in-out duration-300 hover:bg-cb disabled:bg-gray-500"
          disabled={isPending}
        >
          {isPending ? "loading" : "Submit"}
        </button>
      </form>

      <hr className="border border-cd" />

      <p className="text-sm">
        {"Already have account? "}
        <Link to="/" className="text-cc font-semibold hover:underline">
          Login now
        </Link>
        .
      </p>

      <p className="text-sm">
        {
          "People who use our service may have uploaded your contact information to Rishta. "
        }
        <Link to="/" className="text-cc font-semibold hover:underline">
          Learn More
        </Link>
        .
      </p>

      <p className="text-sm">
        {"By signing up, you agree to our "}
        <Link to="/" className="text-cc font-semibold hover:underline">
          {"Terms "}
        </Link>
        ,
        <Link to="/" className="text-cc font-semibold hover:underline">
          {" Privacy Policy "}
        </Link>
        and
        <Link to="/" className="text-cc font-semibold hover:underline">
          {" Cookies Policy"}
        </Link>
        .
      </p>
    </div>
  );
};

export default RegisterComponent;
