import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children, active, linkTo}) => {
  return (
    <Link to={linkTo}>

        <div className={`text-center text-[15px] sm:text-[16px] px-6 py-3 rounded-md font-bold ${active ? "bg-yellow-500 text-black": "bg-slate-600"} hover:scale-95 transition-all duration-200 `}> 
            {children}
        </div>

    </Link>
  )
}

export default Button
