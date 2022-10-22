import React from 'react'
import { FaTrashAlt,FaPen } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'




export const DraftBlog = ({blog}) => {
      const navigate = useNavigate();

      // console.log({blog})
   
  const deleteBlog = ()=>{

  }

  const editBlog = ()=>{
    navigate(`/posts/${blog.id}/edit`)
  }

  return (
    <div className='w-full border-b-[2px] py-[1rem] bg-white'>
      <div className='flex w-[70%] h-[10rem] items-center'> 
        <div className='basis-[20%] mx-[1rem] h-full'>
           <img src={blog.imageURL} className='w-full h-full' alt="" />
        </div>
        <div className='basis-[70%] h-full flex flex-col px-[1rem] '>
            <h3 className='text-[2rem] font-bold'>{blog.title}</h3>
            <p className='text-[1.5rem] text-[#585858]'>{blog.content}</p>
            <div className='mt-2 flex justify-between text-[1.4rem] text-[#585858]'>
                <p>{blog.createdAt}</p>
                <div className='flex justify-between w-[12%]'>
                   <button ><FaTrashAlt className='fill-[red]'/></button>
                   <button onclick={editBlog} ><FaPen className='fill-[green]'/></button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
