import { useState } from "react";
import AuthInput from "../inputs/AuthInput";
import { changepasswordvalidationSchema } from "../../validations/Authentication";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordUserApi } from "../../app/api/userApi";

const ChangePasswordComponent = () => {
  //states
  const [errors, setErrors] = useState({});
  const [changeForm, setChangeForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  //react quires
  const { mutate, isPending } = useMutation({
    mutationFn: resetPasswordUserApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });

  //fundtions
  const handleChange = (e) => {
    setChangeForm({ ...changeForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await changepasswordvalidationSchema.validate(changeForm, {
        abortEarly: false,
      });
      mutate({ changeForm });
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
        <h1 className="text-4xl font-bold text-ca">Reset Password</h1>
        <p className="font-semibold text-sm text-cc">
          {"Enter a new password below to change your password"}
        </p>
      </div>
      <hr className="border border-cd" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <AuthInput
          id="change-old"
          label="Old Password"
          type="text"
          name="oldPassword"
          placeholder="Old Password"
          value={changeForm.oldPassword}
          onChange={handleChange}
          error={errors.oldPassword}
          disable={isPending}
        />
        <AuthInput
          id="change-new"
          label="New Password"
          type="text"
          name="newPassword"
          placeholder="New Password"
          value={changeForm.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
          disable={isPending}
        />
        <AuthInput
          id="change-confirm"
          label="Confirm Password"
          type="text"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={changeForm.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
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
    </div>
  );
};

export default ChangePasswordComponent;
