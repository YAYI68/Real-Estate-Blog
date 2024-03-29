import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom';




export const Carousel = ({sliderBlogs}) => {
 
    const [ curSlide, setCurrentSlide] = useState(0)
    useEffect(() => {
      const timer = setInterval(() =>{
        moveRight()
      },5000)
    
      return () => {
        clearInterval(timer)
      }
    }, [curSlide])
    let maxSlide = sliderBlogs.length

    const moveRight = ()=>{
        if(curSlide >= maxSlide - 1){
            setCurrentSlide(0)
        }
        else{
          setCurrentSlide(curSlide + 1)
        }
    }
     
    const moveLeft = ()=>{
        setCurrentSlide(curSlide - 1)
        if(curSlide <= 0){
            setCurrentSlide(maxSlide - 1)
        }
    }
    
    const SlideBtn = (id)=>{
       setCurrentSlide(id)
    }

  

  return (
     <div className='w-full h-[60rem] md:h-[40rem]  mt-[2rem]'>
        <div  className='slider h-full w-full relative overflow-hidden rounded'>
        <button  onClick={moveLeft} className={`absolute left-[1%] top-[50%] text-[2.5rem] z-10 translate-y-[-50%] h-[4rem] w-[4rem] md:text-[1.5rem] md:h-[3rem] md:w-[3rem] rounded-full bg-[#e8e7e7] flex items-center justify-center`}>
        <svg className="w-8 h-8 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
        </button>
        <button  onClick={moveRight}  className={`absolute right-[1%] top-[50%] text-[2.5rem]  z-10 translate-y-[-50%] h-[4rem] md:text-[1.5rem] md:h-[3rem] md:w-[3rem] w-[4rem] rounded-full bg-[#e8e7e7] flex items-center justify-center`}>
          <svg className="w-8 h-8 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </button>
            {sliderBlogs.map((blog,i)=>(
                <div key={i}  style={{
                  transform: `translateX( ${100 * (i-curSlide)}% )`
                }} className={`absolute top-[0] w-full  h-full   bg-no-repeat bg-cover   transition-transform `}> 
                <img src={blog.imageURL} alt="" className=" h-full w-full brightness-[.4] object-top" />
                <div className='flex flex-col h-[70%] absolute top-[25%] md:top-[7%] md:w-[80%] left-[15%] md:left-[10%] w-[50%] lg:w-[70%]'>
                    <p className='text-[white] text-[1.5rem] md:text-[1.2rem] lg:text-[1.5rem]'>July 13, 2022 <span className='mx-[.5rem]'>|</span>Admin</p>
                    <h3 className='text-[3.5rem] text-[#ff8400] w-[70%] md:w-full md:text-[2.5rem] md:font-semibold'>{blog.title}</h3>
                    <p className='text-[white] text-[2.5rem] md:text-[2rem]'> The content of my blog and story from london  The content of my blog and story from london The content of my blog and story from london  </p>
                    <Link to={`/${blog.slug}`} state={{id:blog.id}} className='text-[white] text-[1.5rem] lg:text-[1.8rem] px-[2rem] py-[1rem] bg-[#8034eb] w-fit text-center my-[1.5rem] rounded' >Read More</Link>
                </div>
              </div>             
            ))}
            <div className='absolute bottom-5 left-1/2 -translate-x-1/2'>
              {sliderBlogs.map((image,i)=>(
                <button key={i} style={curSlide===i?{border:'2px solid white',background:'gray'}:{}} onClick={()=>SlideBtn(i)} className={`h-4 w-4 rounded-full ${curSlide===i?'bg-gray-700 border-2 border-white':''} border-2 border-white bg-white m-2`}></button>
              ))}
            </div>     
          
        </div>
    </div>
  )
}


// translate-x-[${100 * (i-curSlide) }%]