import React from 'react'
import { Link } from 'react-router-dom'

export const RelatedBlog = () => {
  return (
    <div className='w-[90%] p-2 border-2 shadow-md absolute top-[10%] bg-white dark:bg-black'>
    <p className='text-[2rem] font-medium text-center'>Latest Blogs</p>
    <div className='w-full flex flex-col gap-5 '>
      <div className='my-1 w-full flex flex-col gap-2'>
         <small className='text-[1.2rem] text-gray-500'>Oct,24,2022</small>
         <Link to={``}  className='font-semibold text-gray-800 text-[1.5rem] hover:text-[#8034eb] hover:underline'>15 Useful Custom React Hooks for Your Next Web App</Link>
      </div>
      <div className='my-1 w-full flex flex-col gap-2'>
         <small className='text-[1.2rem] text-gray-500 '>Oct,24,2022</small>
         <Link to={``} className='font-semibold text-[1.5rem] text-gray-800 hover:text-[#8034eb] hover:underline'>15 Useful Custom React Hooks for Your Next Web App</Link>
      </div>
      <div className='my-1 w-full flex flex-col gap-2'>
         <small className='text-[1.2rem] text-gray-500'>Oct,24,2022</small>
         <Link to={``} className='font-semibold text-[1.5rem] text-gray-800 hover:text-[#8034eb] hover:underline'>15 Useful Custom React Hooks for Your Next Web App</Link>
      </div>
    </div>
  </div>
  )
}
