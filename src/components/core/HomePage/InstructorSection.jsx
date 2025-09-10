import React from 'react'
import Instructor from "../../../assets/Instructor.png"
import HighlightText from "./HighlightText"
import Button from './Button';
import { FaArrowRightLong } from "react-icons/fa6";

const InstructorSection = () => {
  return (
    <div className="mt-16">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="lg:w-[50%] ">
          <img
            src={Instructor}
            alt="Instructor"
            className="shadow-white shadow-[-20px_-20px_rgba(255,255,255)]"
          />
        </div>

        <div className="lg:w-[50%] flex flex-col gap-10">
          <div className="text-4xl font-semibold lg:w-[50%]">
            Become an
            <HighlightText text={" Instructor"} />
          </div>

          <p className="font-medium text-[16px] w-[80%] text-gray-600">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          <div className="w-fit">
            <Button active={true} linkTo={"/signup"}>
              <div className="flex flex-row gap-2 items-center">
                Start Learning Today
                <FaArrowRightLong />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorSection
