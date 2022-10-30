import React, { useEffect } from 'react'
import { Section } from './Section';
import {Link } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';



export const Blog = ({blogs,title}) => {
   const { setAuthorId } = useStateContext();
   const filterBlogs = blogs.filter((filterblogs)=>filterblogs.title.toLowerCase().includes(title)
    || filterblogs.content.toLowerCase().includes(title));
   useEffect(() => {
     setAuthorId(blogs[0].author.id)
   }, [])
   

  return (
    <Section className={'mt-[5rem]'}>   
      <div className='flex w-full flex-wrap pt-[5rem] lg:pt-[2rem]  gap-6 px-[10rem] lg:px-[5rem] md:flex-col items-center md:items-center md:px-[1rem] dark:text-white  '>
        {filterBlogs.map((blog,index)=>(
        <div key={index} className='flex flex-col  basis-[32%]  md:w-[90%] lg:basis-[48%]  rounded shadow mt-[1.5rem] p-1 dark:text-white dark:bg-gray-800'>
            <div className='w-full h-[20rem] rounded'>
                <img src={blog.imageURL} alt={blog.title} className='h-full w-full rounded' />
            </div>
            <div className='m-[.7rem] flex flex-col h-[15rem] md:h-[18rem] lg:h-[20rem]'>
             <div className="flex flex-col h-[70%] w-full gap-5">
             <Link to={`/${blog.slug}`} state={{id:blog.id}} className='text-[2.2rem] text-[#ff8400] font-bold mb-2'>{blog.title}</Link>
             <div  dangerouslySetInnerHTML={{__html:blog.excerpts}} className='text-[1.5rem] mb-2' />   
             </div>     
            <div className='flex justify-between items-center w-full mt-[1rem] h-[30%]'>
               <Link to={`/${blog.slug}`} state={{id:blog.id}} className='px-[2rem] py-[1rem]  text-[1.2rem] bg-[#8034eb] w-fit text-center text-white  rounded'>Read More</Link>
               <p className='text-[1.2rem] text-[grey] mr-[2rem]'>July 15, 2022</p>
            </div>
            </div>
        </div>
        ))}      
    </div>
    </Section>
  )
}
