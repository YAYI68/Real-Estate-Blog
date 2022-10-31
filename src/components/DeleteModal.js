import React from 'react'
import { Section } from './Section'

export const DeleteModal = ({setModal}) => {
  return (
    <Section>
    <div  onClick={()=>setModal(false)} className='fixed z-[20]  w-[100vw]  h-[100vh] bg-[rgb(0,0,0,0.69)]  left-0 top-0  flex items-center justify-center'></div>
        <div className='w-[28%] lg:left-[20%] lg:w-[50%] sm:left-[8%] h-[30%] top-[20%] bg-white fixed z-[25] md:w-[80%] '>
           <div className='w-full h-full bg-white rounded-md dark:bg-slate-900 flex flex-col p-4 justify-between'>
            <h3 className='dark:text-white text-[3rem]  md:text-[1.8rem] font-semibold lg:text-[2.5rem]'>Are you sure, you want to delete this?</h3>
            <p className='text-[1.8rem] md:text-[1.5rem] dark:text-gray-200'> The Blog title goes here</p>
            <div className='flex justify-between'>
              <button onClick={()=>setModal(false)} type="" className='bg-red-500 tex+t-[1.8rem] rounded-md px-3 py-2 text-center dark:text-white'>Cancel</button>
              <button type=""  className='bg-blue-700 text-[1.8rem] rounded-md px-3 py-2 text-center dark:text-white'>Confirm</button>
            </div>
           </div> 
        </div>
    </Section>
  )
}
