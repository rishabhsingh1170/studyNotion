import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import Button from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection"
import LearningLanguageSectios from "../components/core/HomePage/LearningLanguageSection"
import ExploreHome from "../components/core/HomePage/ExploreHome";

import Banner from "../assets/Banner.mp4";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/common/Footer/Footer";

function Home() {
  return (
    <>
      {/* Section1 */}
      <div className="reative max-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between gap-8">
        <Link to={"/signup"}>
          <div className="group mt-16 p-1 mx-auto rounded-full bg-slate-800 font-bold text-white transition-all duration-200 hover:scale-95 w-fit">
            <div className="flex flex-row items-center rounded-full px-10 py-[5px] transition-all duration-200 gap-2 group-hover:bg-slate-900">
              <p>Become an Instructor</p>
              <FaArrowRightLong />
            </div>
          </div>
        </Link>

        <div className="text-4xl text-center font-semibold mt-7">
          Empower Your Future with <HighlightText text={"Coding Skills"} />
        </div>

        <div className="-mt-4 w-[90%] text-gray-500 text-center text-lg font-bold">
          with our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resourses,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <Button active={true} linkTo={"/signup"}>
            Learn More
          </Button>
          <Button active={false} linkTo={"/login"}>
            Book a Demo
          </Button>
        </div>

        <div className="shadow-[10px_-5px_50px_-5px] shadow-blue-400 mx-3 my-7 rounded-2xl">
          <video
            className="shadow-[20px_20px_rgba(255,255,255)] rounded-2xl"
            muted
            loop
            autoPlay
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/**code section 1 */}
        <div className="px-5">
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your
                <HighlightText text={" coding potential "} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            btn1={{
              btnText: "Try it yourself",
              linkto: "/signup",
              active: true,
            }}
            btn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>
                          <html>
                            <head>
                              <title>Example</title>
                            </head>
                            <body>
                              <h1><a href="/">Header</a></h1>
                              <nav>
                                <a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a>
                              </nav>`}
            codeColor={"text-yellow-500"}
            backgroundGradient={"yellow"}
          />
        </div>

        {/**code section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Start
                <HighlightText text={" Coding in seconds "} />
                with our online courses
              </div>
            }
            subheading={
              "Go ahead it a try, Our hands-on learning environment means you'll be writting real code from your very first lesson"
            }
            btn1={{
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            btn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`import React from 'react'
                        import Button from './Button'
                        import { FaArrowRightLong } from "react-icons/fa6";
                        import { TypeAnimation } from 'react-type-animation';
                        
                        function Home() {
                          return (
                            <div>Home</div>
                          )
                        }
                        export default Home;  `}
            codeColor={"text-blue-500"}
            backgroundGradient={"blue"}
          />
        </div>

        <ExploreHome />

      </div>

      {/* Section2 */}
      <div className="bg-gray-100 text-slate-800 w-full">
        <div className="homepage_bg h-[100px] lg:h-[333px]">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto">
            <div className="lg:h-[200px]"></div>
            <div className="flex flex-row gap-7 text-white ">
              <Button active={true} linto={"./signup"}>
                <div className="flex items-center gap-3">
                  Explore Full catalog
                  <FaArrowRightLong />
                </div>
              </Button>

              <Button active={false} linto={"./signup"}>
                <div className="flex items-center gap-3">Learn more</div>
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-8">
          <div className="flex flex-col lg:flex-row justify-evenly gap-7 mb-10 mt-[95px]">
            <div className="text-4xl font-semibold lg:w-[40%]">
              Get the Skills you need for a
              <HighlightText text={" Job that is in demand"} />
            </div>

            <div className="flex flex-col gap-10 lg:w-[40%] items-start">
              <div className="text-[16px] text-gray-700 font-semibold">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <Button active={true} linto={"/signup"}>
                <div>Learn more</div>
              </Button>
            </div>
          </div>

          <TimelineSection />

          <LearningLanguageSectios />
        </div>
      </div>

      {/* Section3 */}
      <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-center gap-8 first-letter bg-slate-950 text-white">
        <InstructorSection />

        <h2 className="text-center text-4xl font-semibold mt-10 border-2">
          Review from other Learners
        </h2>
        {/* Review slider here */}
      </div>

      {/* footer */}
      <Footer />
    </>
  );
}

export default Home;
