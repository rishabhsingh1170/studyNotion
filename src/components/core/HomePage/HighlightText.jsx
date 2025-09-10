import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className='text-green-400 font-bold bg-gradient-to-b from-green-400 to-blue-500 text-transparent bg-clip-text'>{text}</span>
  )
}

export default HighlightText
