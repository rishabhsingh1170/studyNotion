//const BASE_URL = process.env.REACT_APP_API_URL;
const BASE_URL = "http://localhost:4000/api/v1";

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendOTP",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/profile/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/profile/reset-password",
};

export const categories = {
  CATEGORIES_API: `${BASE_URL}/course/showAllCategory`,
};