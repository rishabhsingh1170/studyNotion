import React from 'react'
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx'
import pattern from '../../assets/bgFrame.png'

const Template = ({ title, description1, description2, image, formType }) => {
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center w-full">
      <div className="mx-auto flex w-10/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
        {/* left Section */}
        <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-gray-100">
            {title}
          </h1>
          <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
            <span className="text-gray-400">{description1}</span> <br />
            <span className="font-edu-sa font-bold italic text-blue-400">
              {description2}
            </span>
          </p>
          {formType === "signup" ? <SignupForm /> : <LoginForm />}
        </div>

        {/* Right Section */}
        <div className="w-1/2 flex justify-center items-center">
          <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
            <img
              src={pattern}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
            />
            <img
              src={image}
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="absolute -top-4 right-4 z-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template
