import React, { useEffect, useState } from 'react'



export const Carousel = () => {
    const [ curSlide, setCurrentSlide] = useState(0)
    

      // setInterval(() => {
      //   moveRight() 
      // }, 12000);

    useEffect(() => {
      const timer = setInterval(() =>{
        moveRight()
      },5000)
    
      return () => {
        clearInterval(timer)
      }
    }, [curSlide])
      

    const images = ["./images/house1.jpg","./images/house2.jpg","./images/house3.jpg"]
    let maxSlide = images.length

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

    const imageShow = [
      {
        image:"./images/house1.jpg",
        slide:"carousel_1"
      },
      {
        image:"./images/house2.jpg",
        slide:"carousel_2"
      },
      {
        image:"./images/house3.jpg",
        slide:"carousel_3"
      },

    ]
 

  return (
    <div className='w-full h-[55rem]  mt-[2rem]'>
        <div  className='slider h-full w-full relative overflow-hidden rounded'>
        <button  onClick={moveLeft} className={`absolute left-[1%] top-[50%] text-[2.5rem] z-10 translate-y-[-50%] h-[4rem] w-[4rem] rounded-full bg-[#d5d1d1] flex items-center justify-center`}>
        <svg className="w-8 h-8 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
        </button>
        <button  onClick={moveRight}  className={`absolute right-[1%] top-[50%] text-[2.5rem] z-10 translate-y-[-50%] h-[4rem] w-[4rem] rounded-full bg-[#d5d1d1] flex items-center justify-center`}>
          <svg className="w-8 h-8 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </button>
            {imageShow.map((show,i)=>(
                <div  className={`absolute top-[0] w-full  h-full   bg-no-repeat bg-cover  translate-x-[${100 * (i-curSlide) }%]  transition-transform `}> 
                <img src={show.image} alt="" className=" h-full w-full brightness-[.5] object-top" />
                <div className='flex flex-col h-[70%] absolute top-[25%] left-[15%] w-[50%]'>
                    <p className='text-[white] text-[1rem] '>July 13, 2022 <span className='mx-[.5rem]'>|</span>Admin</p>
                    <h3 className='text-[3rem] text-[#ff8400] w-[70%]'> London Michelin doing the takeaway London Michelin doing the takeaway</h3>
                    <p className='text-[white] text-[1.5rem]'> The content of my blog and story from london  The content of my blog and story from london The content of my blog and story from london  </p>
                    <a href="" className='text-[white] text-[1.2rem] px-[2rem] py-[1rem] bg-[#8034eb] w-fit text-center my-[1.5rem] rounded' >Read More</a>
                </div>
              </div>    
                         
            ))}
            <div className='absolute bottom-5 left-1/2'>
              {images.map((image,i)=>(
                <button onClick={()=>SlideBtn(i)} className='h-4 w-4 rounded-full  bg-white m-2'></button>
              ))}
            </div>     
          
        </div>
    </div>
  )
}
