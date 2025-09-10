import React, { use, useState } from 'react'
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../services/authAPI';

const LoginForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
      email:"",
      password:"",
  })

  const {email, password} = formData;

  const submitHandler = (e) => {
      e.preventDefault();
      console.log("Form Submitted");
      dispatch(login(email, password,navigate));
    }

  return (
    <form onSubmit={submitHandler} className="mt-6 flex w-full flex-col gap-y-4">
      <label className="w-full">
        <p className="mb-1 text-[1rem] leading-[1.375rem] text-gray-300">
          Email Address <sup className="text-red-600">*</sup>
        </p>
        <input
          type="email"
          placeholder="Enter Email Address"
          value={email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="form-style w-full"
        />
      </label>
      <label className="relative">
        <p className="mb-1 text-[1rem] leading-[1.375rem] text-gray-300">
          Password <sup className="text-red-600">*</sup>
        </p>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          className="form-style w-full"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer text-gray-300"
        >
          {showPassword ? <RxEyeOpen /> : <GoEyeClosed />}
        </span>
        <Link to="/forgot-password" className="absolute bottom-[-25px] right-2 z-[10] cursor-pointer text-blue-300">
          Forgot Password?
        </Link>
      </label>
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-500 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Sign In
      </button>
    </form>
  );
}

export default LoginForm
