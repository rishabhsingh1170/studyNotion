import toast from "react-hot-toast";
import { setLoading, setToken } from "../slices/authSlice";
import { apiConnector } from "./apiConnector";
import { endpoints } from "./apis.js";
import { setUser } from "../slices/profileSlice";
import { Navigate } from "react-router-dom";
import { ApiProvider } from "@reduxjs/toolkit/query/react";

//send OTP API
export const sendOTP = (email, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loding...");
    dispatch(setLoading(true));

    try {
        const response = await apiConnector("POST", endpoints.SENDOTP_API, email);

        console.log("SENDOTP API RESPONSE.....");
        console.log(response.data.success);

        if (!response.data.success) {
          throw new Error(response.data.message);
        }

        toast.success("OTP Sent Successfully");
        navigate("/verify-email")
      
    } catch (error) {
      console.log("SENDOTP API ERROR.......", error);
      toast.error("Otp Send Failed");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}

//sign Up API
export const signUp = (
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) => {
  return async (dispatch) => {
  
    const toastId = toast.loading("Loding...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", endpoints.SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        accountType,
      });

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Sign Up Successfully");
      navigate("/login");
    } catch (error) {
      console.log("SIGN UP API ERROR.......", error);
      toast.error("Sigup Failed");
      navigate("/signup")
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

//login API
export const login =(email, password, Navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loding...");
    dispatch(setLoading(true));

    try {
        const response = await apiConnector("POST", endpoints.LOGIN_API, {
          email,
          password,
        });

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        toast.success("Login Successfully");
        dispatch(setToken(response.data.token));

        const userImage = response.data?.user?.image
          ? response.data.user.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

        dispatch(setUser({...response.data.user,image:userImage}))  
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem(
          "user",
          JSON.stringify({ ...response.data.user, image: userImage })
        );
        //Navigate("/dashboard/my-profile")
    } catch (error) {
        console.log("LOGIN API ERROR.......",error);
        toast.error("Login Failed");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

//logout API
export const logout = (Navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loding...");
    dispatch(setLoading(true));
    try {
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        Navigate("/");
        toast.success("Logout Successfully");
    } catch (error) {
        console.log("LOGOUT API ERROR.......",error);
        toast.error("Logout Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}


//get reset password token email API
export const resetPasswordToken = (email, setEmailSent) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "POST",
        endpoints.RESETPASSTOKEN_API,
        { email }
      );

      console.log("RESET PASSWORD TOKEN API RESPONSE.....", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Rest Email sent");
      setEmailSent(true);
    } catch (error) {
      console.log("RESET PASSWORD TOKEN API ERROR.......", error);
      toast.error("Failed To Send Reset Email");
    }

    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
};

//reset password API
export const resetPassword = (password, confirmPassword, token, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loding...");
    dispatch(setLoading(true));
    
    try {
      const response = await apiConnector("POST", endpoints.RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });

      console.log("RESET PASSWORD API RESPONSE.....", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password Rest Successfully");
      navigate("/login");
    } catch (error) {
      console.log("RESET PASSWORD API ERROR.......", error);
      toast.error("Rest Password Failed");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}