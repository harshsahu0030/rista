import { object, ref, string } from "yup";

// update profile
export const updateProfile = object({
  username: string()
    .required("Username is Required")
    .min(3, "Username must be at least 3 charaters"),
  name: string().required("Name is Required"),
  bio: string(),
});

//login
export const loginvValidationSchema = object({
  input: string().required("Username or Email is Required"),

  password: string().required("Password is required"),
});

//register
export const registerValidationSchema = object({
  username: string()
    .strict()
    .lowercase("Username should be in lowercase")
    .matches(/^(\S+$)/g, "* This field cannot contain only blankspaces")
    .min(3, "* Username must be at least 3 characters")
    .required("Username is Required"),

  email: string().required("Email is Required").email("Invalid email format"),

  name: string().required("Name is Required"),

  birthday: string().required("Birthday is Required"),

  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one symbol"
    )
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
});

//otp
export const otpValidationSchema = object({
  otp: string().strict().required("Otp number is required"),
});

//forgot password
export const forgotPasswordValidationSchema = object({
  email: string().required("Email is Required").email("Invalid email format"),
});

//reset password
export const resetpasswordvalidationSchema = object({
  newPassword: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one symbol"
    )
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter"),

  confirmPassword: string().oneOf(
    [ref("newPassword"), null],
    "Passwords don't match"
  ),
});

//cjhange password
export const changepasswordvalidationSchema = object({
  oldPassword: string().required("Old Passeword is Required"),

  newPassword: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one symbol"
    )
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter"),

  confirmPassword: string().oneOf(
    [ref("newPassword"), null],
    "Passwords don't match"
  ),
});
