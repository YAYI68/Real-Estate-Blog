import React from 'react'
import { Link } from 'react-router-dom';
import { DraftBlog } from '../components/DraftBlog';
import { Main } from '../components/Main'
import { Section } from '../components/Section';
import { TabSlide } from '../components/TabSlide';





export const DraftPage = () => {
  return (
    <Main>
       <Section>
        <div className='px-[25rem]'>
            <div className="flex mb-[2rem] items-center justify-between w-full">
              <h2 className='text-[4rem] font-bold '>Your Posts</h2>
              <div>
               <Link to='/posts/edit' className='border-2 px-[2rem] py-[1rem] text-[1.5rem] rounded-[.5rem] text-white bg-[#8034eb]'>Write a post</Link>
              </div>
            </div> 
            <div className='w-full mb-[2rem]'>
             <TabSlide current='draft'/>
           </div>
           <div className='w-full mb-[2rem]'>
             <DraftBlog/>
             {/* <div className='w-full mt-[2rem]'>
                <p className='text-center text-[2rem] '>You haven`t write any article yet.</p>
             </div> */}
           </div>
        </div>
       </Section>
    </Main>
  )
}
