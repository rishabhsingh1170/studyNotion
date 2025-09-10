import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from "../../../assets/know_your_progress.png"
import compare_with_others from "../../../assets/compare_with_others.svg";
import plan_your_lessons from "../../../assets/plan_your_lessons.svg";
import Button from './Button';

const LearningLanguageSection = () => {
  return (
    <div className="mt-[130px]">
      <div className="flex flex-col gap-5 items-center">
        <div className="text-4xl flex-col text-center font-bold text-gray-700">
          Your Swiss Knife for
          <HighlightText text={" learning any language"} />
        </div>

        <div className="lg:text-center text-gray-700 mx-auto text-base mt-3 font-medium w-[75%]">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className="flex flex-col lg:flex-row items-center mt-5">
          <img
            src={know_your_progress}
            alt="know your progress"
            className="object-contain lg:-mr-32"
          />

          <img
            src={compare_with_others}
            alt="compare with others"
            className="object-contain -mt-10"
          />

          <img
            src={plan_your_lessons}
            alt="plan your lesson"
            className="object-contain -mt-16 lg:-ml-36"
          />
        </div>

        <div className="w-fit mb-5">
          <Button active={true} linkTo={"/signup"}>
            Learn more
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LearningLanguageSection
