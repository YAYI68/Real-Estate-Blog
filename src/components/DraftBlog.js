import React from 'react'
import { FaTrashAlt,FaPen } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { convertTimeToDate } from '../utils/blog_util';




export const DraftBlog = ({blog}) => {
      const navigate = useNavigate();

      // console.log({blog})
   
  const deleteBlog = ()=>{

  }


  return (
    <div className='w-full border-b-[2px] py-[1rem] bg-white dark:bg-slate-900 text-white'>
      <div className='flex w-[90%] md:w-full h-[15rem] lg:h-[13rem] md:h-[13rem] items-center'> 
        <div className='basis-[30%] mx-[1rem] h-full'>
           <img src={blog.imageURL} className='w-full h-full' alt="" />
        </div>
        <div className='basis-[70%] h-full flex flex-col px-[1rem] gap-4 md:gap-2 '>
            <h3 className='text-[2.2rem] md:text-[2rem] sm:text-[1.7rem] font-bold text-[#ff8400]'>{blog.title}</h3>
            <div  dangerouslySetInnerHTML={{__html: blog.excerpts}}  className='text-[1.5rem] font-semibold md:text-[1.4rem] sm:text-[1.1rem] text-gray-800 dark:text-white' />
            <div className='mt-2 flex justify-between items-center text-[1.4rem] sm:text-[.8rem] text-[#585858]'>
                <p className='dark:text-gray-200 text-gray-500 text-[1.1rem]'>{ convertTimeToDate(blog.createdAt)}</p>
                <div className='flex justify-between '>
                   <button className="h-14 w-14 flex items-center justify-center rounded-full hover:bg-slate-200 cursor-pointer "><FaTrashAlt className='fill-[red]'/></button>
                   <Link to={`/blogs/${blog.id}/edit`}  className="h-14 w-14 flex items-center justify-center rounded-full hover:bg-slate-200 cursor-pointer " ><FaPen className='fill-[green]'/></Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
