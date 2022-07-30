import React from 'react'
import { Section } from './Section';
import {Link } from 'react-router-dom';
import { blogPost } from '../blog';



export const Blog = () => {
  return (
    <Section>
    <div className='flex w-full flex-wrap justify-between px-[10rem]'>
        {blogPost.map((blog,index)=>(
        <div className='flex flex-col basis-[30%] h-[35rem] rounded shadow mt-[1.5rem] p-1 '>
            <div className='w-full h-[60%] rounded'>
                <img src={blog.postImage} alt="" className='h-full w-full rounded' />
            </div>
            <div className='m-[.7rem] flex flex-col'>
            <p className='text-[2.2rem] text-[#ff8400] font-bold'>{blog.title}</p>
            <p className='text-[1.5rem]'>{blog.content}</p>
            <div className='flex justify-between items-center w-full mt-[1rem]'>
               <Link to={`/${blog.id}`} className='px-[2rem] py-[1rem]  text-[1.2rem] bg-[#8034eb] w-fit text-center text-white  rounded'>Read More</Link>
               <p className='text-[1.2rem] text-[grey] mr-[2rem]'>July 15, 2022</p>
            </div>
            </div>
        </div>
        ))}      
    </div>
    </Section>
  )
}
