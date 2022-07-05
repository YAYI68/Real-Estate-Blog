import React, { useState } from 'react'



export const Carousel = () => {
    const [ curSlide, setCurrentSlide] = useState(0)
    console.log(curSlide)

    const rightBtn = ()=>{
        setCurrentSlide(curSlide + 1)
        if(curSlide >= color.length){
            setCurrentSlide(0)
        }
    }
    
    const leftBtn = ()=>{
        setCurrentSlide(curSlide - 1)
        if(curSlide < 0){
            setCurrentSlide(color.length - 1)
        }
    }

    const color = ["blue","red","green"]
    color.map(col=>console.log(col))

    const g = "blue"

  return (
    <div className='w-full h-[50rem]  mt-[2rem]'>
        <div className='slider h-full w-full relative overflow-hidden'>
        <button  onClick={leftBtn} className={`absolute left-[2%] top-[50%] text-[2.5rem] z-10 translate-y-[-50%] h-[4rem] w-[4rem] rounded-full bg-[white] flex items-center justify-center`}>
        <svg className="w-8 h-8 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
        </button>
        <button  onClick={rightBtn}  className={`absolute right-[2%] top-[50%] text-[2.5rem] z-10 translate-y-[-50%] h-[4rem] w-[4rem] rounded-full bg-[white] flex items-center justify-center`}>
          <svg className="w-8 h-8 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </button>
               {color.map((col,i)=>(
                 <div className={`absolute top-[0] left-[0] w-full h-full bg-[${col}] translate-x-[${100 *(i-curSlide)}%]`}> 
                
                 </div> 
               ))}
            
            
             {/* <div className={`absolute top-[0] left-[0] w-full h-full bg-[green] translate-x-[100%]`}> 
                
            </div>
            <div className={`absolute top-[0] left-[0] w-full h-full bg-[yellow] translate-x-[-50%]`}>
                
            </div>
            <div className={`absolute top-[0] left-[0] w-full h-full bg-[blue] translate-x-[50%] `}>
               
            </div> */}
          
        </div>
    </div>
  )
}
