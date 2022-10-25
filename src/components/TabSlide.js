import React from 'react';
import { Link } from 'react-router-dom';


export const TabSlide = ({current}) => {
  return (
    <div className={`flex items-center border-b-[1px] pb-[1rem]`}>
        <div >
          <Link to="/posts/draft" className={`pb-[1rem]  text-[1.5rem] sm:text-[1.2rem] font-bold mr-[2rem] ${current==='draft'?'text-[black] border-b-[2px] border-black':'text-[grey]'} `}>Draft<span className='ml-2'>1</span></Link>
        </div>
        <div>
          <Link to="/posts/public" className={`pb-[1rem]  text-[1.5rem] sm:text-[1.2rem] font-bold mr-[2rem] ${current==='publish'?'text-[black] border-b-[2px] border-black':'text-[grey]'} `}>Published<span className='ml-2'>1</span></Link>
        </div>
    </div>
  )
}
