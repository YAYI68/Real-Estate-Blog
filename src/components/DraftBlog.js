import React from 'react'
import { FaTrashAlt,FaPen } from 'react-icons/fa'


export const DraftBlog = () => {
  return (
    <div className='w-full border-b-[2px] py-[1rem]'>
      <div className='flex w-[70%] h-[10rem] items-center'> 
        <div className='basis-[20%] mx-[1rem] h-full'>
           <img src="./images/house1.jpg" className='w-full h-full' alt="" />
        </div>
        <div className='basis-[70%] h-full flex flex-col px-[1rem] '>
            <h3 className='text-[2rem] font-bold'>Title</h3>
            <p className='text-[1.5rem] text-[#585858]'>The body of my post</p>
            <div className='mt-2 flex justify-between text-[1.4rem] text-[#585858]'>
                <p>July 2,<span>2022</span></p>
                <div className='flex justify-between w-[12%]'>
                   <button ><FaTrashAlt className='fill-[red]'/></button>
                   <button><FaPen className='fill-[green]'/></button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
