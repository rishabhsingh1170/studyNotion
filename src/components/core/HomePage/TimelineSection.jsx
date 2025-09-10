import React from 'react'
import Logo1 from "../../../assets/Logo1.svg"
import Logo2 from "../../../assets/Logo2.svg"
import Logo3 from "../../../assets/Logo3.svg"
import Logo4 from "../../../assets/Logo4.svg"
import timelineImg from "../../../assets/timelineImg.jpg"

const timeline = [
  {
    Logo: Logo1,
    Heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    Heading: "Responsiblity",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    Heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    Logo: Logo4,
    Heading: "Solve the problem",
    Description: "Code you way to a solution",
  },
];

const TimelineSection = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-20 mb-20 items-center">
      <div className="lg:w-[45%] flex flex-col gap-14 items-end">
        <div className="flex flex-col gap-8">
          {timeline.map((element, index) => {
            return (
              <div className="">
                <div className="flex gap-6" key={index}>
                  <div className="w-[52px] h-[52px] bg-white flex items-center justify-center rounded-full shadow-[#00000012] shadow-[0_0_62px_0]">
                    <img src={element.Logo} alt="" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-[18px]">
                      {element.Heading}
                    </h2>
                    <p className="text-base">{element.Description}</p>
                  </div>
                </div>
                {index !== 3 && (
                  <div className="hidden lg:block border-dotted border-r border-gray-400 h-14  w-[26px]"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative shadow-blue-600 shadow-[10px_-5px_50px_-5px]">
        <img
          src={timelineImg}
          alt="timelineImg"
          className="shadow-[20px_20px_rgba(255,255,255)]"
        />

        <div className="absolute bg-green-950 flex flex-row text-white uppercase left-[50%] translate-x-[-50%] translate-y-[-50%] p-3">
          <div className="flex flex-row gap-5 items-center border-r border-green-600 px-7">
            <p className="text-3xl font-bold">10</p>
            <p className="text-green-600 text-sm">Years of Experience</p>
          </div>

          <div className="flex gap-5 items-center px-7">
            <p className="text-3xl font-bold">250</p>
            <p className="text-green-600 text-sm">types of courses</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelineSection
