import React from 'react';


export const TabSlide = ({currentState, setCurrentState, counts}) => {

  return (
    <div className={`flex items-center border-b-[1px] pb-[1rem]`}>
        <div >
          <button onClick={()=>setCurrentState("draft")} className={`pb-[1rem] dark:text-gray-200  text-[1.5rem] sm:text-[1.2rem] font-bold mr-[2rem] ${currentState==='draft'?'text-blue-600 border-b-[2px] border-blue-600':'text-[grey]'} `}>Draft<span className='ml-2'>{counts}</span></button>
        </div>
        <div>
          <button onClick={()=>setCurrentState("publish")}  className={`pb-[1rem] dark:text-gray-200 text-[1.5rem] sm:text-[1.2rem] font-bold mr-[2rem] ${currentState==='publish'?'text-blue-600  border-b-[2px] border-blue-600':'text-[grey]'} `}>Published<span className='ml-2'>{counts}</span></button>
        </div>
    </div>
  )
}
