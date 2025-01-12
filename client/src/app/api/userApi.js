import axios from "axios";

//register user
export const registerUserApi = async (signUpForm) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.post(`/api/v1/register`, signUpForm, config);
  return data;
};

//register user otp detail
export const registerUserOtpDetailApi = async (id) => {
  const { data } = await axios.get(`/api/v1/register/info/${id}`);
  return data;
};

//register user otp resend
export const registerUserVerificationResendOtpApi = async (otpId) => {
  const { data } = await axios.get(`/api/v1/register/resend/${otpId}`);
  return data;
};

//register user verification
export const registerUserVerificationApi = async ({ otpId, otp }) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.post(
    `/api/v1/register/${otpId}`,
    { otp },
    config
  );
  return data;
};

//login user
export const loginUserApi = async (signinForm) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.post(`/api/v1/login`, signinForm, config);
  return data;
};

//load user
export const loadUserApi = async () => {
  const { data } = await axios.get(`/api/v1/load`);
  return data;
};

//forgot password  user
export const forgotPasswordUserApi = async (forgotForm) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.post(
    `/api/v1/password/forgot`,
    forgotForm,
    config
  );
  return data;
};

//reset password  user
export const resetPasswordUserApi = async ({ resetForm, token }) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.put(
    `/api/v1/password/reset/${token}`,
    resetForm,
    config
  );
  return data;
};

//logout user
export const logoutUserApi = async () => {
  const { data } = await axios.get(`/api/v1/logout`);
  return data;
};

//update user profile
export const updateUserProfileApi = async (updateForm) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.put(
    `/api/v1/update/profile`,
    updateForm,
    config
  );
  return data;
};

//change user password
export const changeUserPasswordApi = async (updateForm) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.put(
    `/api/v1/update/password`,
    updateForm,
    config
  );
  return data;
};

//----------------------------------------------------------------------------------------

//get users
export const getUsersApi = async ({ search = "" }) => {
  const { data } = await axios.get(
    `/api/v1/users?${search && `search=${search}`}`
  );
  return data;
};

//get users
export const getUserApi = async (id) => {
  const { data } = await axios.get(`/api/v1/users/${id}`);
  return data;
};
