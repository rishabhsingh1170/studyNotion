import React from 'react'
import { RiGroupFill } from "react-icons/ri";
import { PiTreeViewBold } from "react-icons/pi";

const CourseCard = ({course, currentCard, setCurrentCard}) => {
  return (
    <div
      className={`w-[360px] mt-8 lg:w-[30%]  h-[300px] box-border cursor-pointer  ${
        currentCard === course.heading
          ? "bg-white text-gray-800 shadow-[12px_12px_0_0] shadow-yellow-500"
          : "bg-slate-800 text-white"
      }`}
      onClick={() => setCurrentCard(course.heading)}
    >
      <div className="border-b-[2px] border-gray-900 border-dashed h-[80%] p-6 flex flex-col gap-3">
        <div className=" font-semibold text-[20px]">
          {course.heading}
        </div>
        <div className="text-gray-500">{course.description}</div>
      </div>

      <div className="flex justify-between text-blue-300 px-6 py-3 font-medium">
        <div className="flex items-center gap-2 text-[16px]">
          <RiGroupFill />
          <p>{course.level}</p>
        </div>

        <div className="flex items-center gap-2 text-[16px]">
          <PiTreeViewBold />
          <p>{course.lessionNumber} Lession</p>
        </div>
      </div>
    </div>
  );
}

export default CourseCard
