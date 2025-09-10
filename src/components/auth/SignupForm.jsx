import React, { useState } from 'react'
import Tab from '../common/Tab';
import { RxEyeOpen } from 'react-icons/rx';
import { GoEyeClosed } from 'react-icons/go';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSignupData } from '../../slices/authSlice';
import { sendOTP } from "../../services/authAPI";

const SignupForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("Student");
  const [showPassword,setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { firstName, lastName, email, password, confirmPassword } = formData;


  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: "Student",
    },
    {
      id: 2,
      tabName: "Instructor",
      type: "Instructor",
    },
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    if(password != confirmPassword){
      toast.error("Password not matched")
      return;
    }
    const signupData = {
      ...formData,
       accountType,
    }
    dispatch(setSignupData(signupData));
    dispatch(sendOTP(signupData, navigate));

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType("Student")
  
  };

  return (
    <div>
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      <form onSubmit={submitHandler} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-10">
          <label className="">
            <p className="mb-1 text-[1rem] leading-[1.375rem] text-gray-300">
              First Name <sup className="text-red-600">*</sup>
            </p>
            <input
              type="text"
              value={firstName}
              placeholder="Enter First Name"
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="form-style"
              required
            />
          </label>

          <label className="">
            <p className="mb-1 text-[1rem] leading-[1.375rem] text-gray-300">
              Last Name <sup className="text-red-600">*</sup>
            </p>
            <input
              type="text"
              value={lastName}
              placeholder="Enter Last Name"
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="form-style"
              required
            />
          </label>
        </div>

        <label className="w-full">
          <p className="mb-1 text-[1rem] leading-[1.375rem] text-gray-300">
            Email Address <sup className="text-red-600">*</sup>
          </p>
          <input
            type="email"
            value={email}
            placeholder="Enter Email Address"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="form-style w-full"
            required
          />
        </label>

        <div className="flex gap-x-10">
          <label className="relative">
            <p className="mb-1 text-[1rem] leading-[1.375rem] text-gray-300">
              Password <sup className="text-red-600">*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Enter Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="form-style"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[42px] z-[10] cursor-pointer text-gray-300"
            >
              {showPassword ? <RxEyeOpen /> : <GoEyeClosed />}
            </span>
          </label>

          <label className="relative">
            <p className="mb-1 text-[1rem] leading-[1.375rem] text-gray-300">
              Confirm Password <sup className="text-red-600">*</sup>
            </p>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="form-style"
              required
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-[42px] z-[10] cursor-pointer text-gray-300"
            >
              {showConfirmPassword ? <RxEyeOpen /> : <GoEyeClosed />}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-500 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupForm
