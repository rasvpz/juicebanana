import React from 'react'
import Header from './Header'

const Browse = () => {
  return (
    <div>
  <Header />
    <img
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
        src="https://cdn.pixabay.com/photo/2017/03/23/17/00/oranges-2168865_1280.jpg"
        alt="background"
    />

    </div>
  )
}

export default Browse
