import React, { useState } from 'react'
import { homePageExplore } from '../../../data/HomePageExplore';
import HighlightText from "../../core/HomePage/HighlightText.jsx"
import CourseCard from './CourseCard.jsx';


const tags = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths"
];

const ExploreHome = () => {

    const [currentTag, setCurrentTag] = useState(tags[0]);
    const [currentCourses, setCurrentCourses] = useState(homePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(homePageExplore[0].courses[0].heading);

    const setValues = (value) => {
        setCurrentTag(value);
        const selectedCategory = homePageExplore.find(category => category.tag === value);
        setCurrentCourses(selectedCategory ? selectedCategory.courses : []);
        setCurrentCard(selectedCategory.courses[0].heading);
    }

    //console.log(currentCourses);

  return (
    <div className=' relative w-full'>
      <div className="text-4xl text-center font-bold">
        Unlock the
        <HighlightText text={" Power of Code"} />
      </div>
      <p className='text-gray-400 font-semibold mt-2 mb-2 text-center'>Learn to Build Anything You Can Imagine</p>

      <div className='hidden lg:flex gap-8 mx-auto w-max bg-gray-900 rounded-full px-4 py-2 mt-6 border-b-2'>
        {tags.map((element, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full ${currentTag === element ? 'bg-slate-950 text-white' : 'transition-all duration-200 hover:bg-slate-800 text-gray-400'}`}
            onClick={() => setValues(element)}
          >
            {element}
          </button>
        ))}
      </div>

      <div className='hidden lg:block lg:h-[200px]'></div>

      <div className='flex flex-col lg:flex-row justify-center items-center lg:justify-evenly lg:absolute lg:bottom-[-40%]'>
        {currentCourses.map((course, key) => {
            return (
              <CourseCard
                key={key}
                course={course}
                currentCard={currentCard}
                setCurrentCard={setCurrentCard}
              />
            );
        })}
      </div>
    </div>
  );
}

export default ExploreHome
