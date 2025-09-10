import React from 'react'
import { Link } from "react-router-dom";

const Links = ({heading, items}) => {
  return (
    <div>
      <div className="">
        <h1 className='text-[16px] font-semibold text-gray-300 mb-2'>{heading}</h1>
        <div className="flex flex-col gap-2 ">
          {items.map((item, index) => {
            return (
              <Link key={index} to={item.link} className="hover:text-gray-300 transition-all duration-300">
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Links

