import React from 'react'
import Button from './Button'
import { FaArrowRightLong } from "react-icons/fa6";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({position, heading, subheading, btn1, btn2, codeblock, backgroundGradient, codeColor}) => {
  return (
    <div className={`flex flex-col ${position} my-20 justify-between gap-10`}>
      {/**section 1 */}
      <div className="w-[100%] lg:w-[50%] flex flex-col  gap-8 text-white">
        {heading}
        <div className="text-slate-700 font-bold">{subheading}</div>

        <div className="flex gap-7 mt-7">
          <Button active={btn1.active} linkTo={btn1.linkto}>
            <div className="flex gap-2 items-center">
              {btn1.btnText}
              <FaArrowRightLong />
            </div>
          </Button>

          <Button active={btn2.active} linkTo={btn2.linkto}>
            {btn2.btnText}
          </Button>
        </div>
      </div>

      {/**section 2 */}
      <div className="h-fit flex flex-row text-[10px] w-[100%] py-4 lg:w-[500px] bg-transparent relative code-border">
        {/** todo-bg gradiant */}
        <div
          className={`${
            backgroundGradient === "yellow" ? "codeblock1" : "codeblock2"
          } absolute`}
        ></div>
        <div className="text-center text-[15px] flex flex-col w-[10%] text-slate-500 font-bold">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
        </div>

        <div
          className={`w-[90%] text-[12px] lg:text-[15px] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}
        >
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}
            repeat={Infinity}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
              // display:"block"
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
}

export default CodeBlocks  
