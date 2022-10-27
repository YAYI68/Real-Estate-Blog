import React, { Fragment, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';



export const MobileNav = ({ currentMode,setModeDropdown,modeDropdown,toggleMode,userInfo,signUserOut }) => {
    const [navSlide, setNavSlide] = useState(false);


  return (
    <nav className='h-full w-full dark:bg-black bg-white hidden  md:flex py-[1.5rem] items-center  justify-between relative'>
    <Link to="/" className='text-[#8034eb] text-[2rem] ml-6'>Blog</Link>
    <div className='flex gap-10 mr-3'>
<div className='relative flex items-center justify-center'>
<button onClick={()=>setModeDropdown(!modeDropdown)} type="" className='w-10 h-10'>
{currentMode === "Dark" ?
<svg className={`w-full h-full dark:fill-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
:
<svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
 }
</button>

{modeDropdown && 
<ul className='absolute z-10 top-[100%] border-light-blue dark:border-light-blue translate-x-[-2rem] border-2 w-fit bg-white dark:bg-black shadow-xl rounded-md py-1'>
  <li onClick={()=>toggleMode('Light')} className='flex items-center cursor-pointer py-2 px-4 dark:text-white gap-2 font-semibold dark:hover:bg-slate-800  hover:bg-slate-300 rounded-sm'>
  <svg className={`w-6 h-6 ${currentMode === 'Light'? 'text-light-blue': '' }`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
  <span  className={`${currentMode === 'Light'? 'text-light-blue': '' } text-[1.3rem]`}>Light</span></li>
  <li onClick={()=>toggleMode('Dark')} className={`flex items-center cursor-pointer py-2 px-4 dark:text-white gap-2 font-semibold dark:hover:bg-slate-800  hover:bg-slate-300 rounded-sm`}>
  <svg className={` w-6 h-6 ${currentMode === 'Dark'? 'fill-light-blue': '' }`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
    <span className={`${currentMode === 'Dark'? 'text-light-blue': '' } text-[1.3rem]`}>Dark</span></li>
</ul>
}
</div>
       <div className='mr-2'>
       { navSlide ?
          <button onClick={()=>setNavSlide(false)} type="" className='h-14 w-14 p-2 transition ease-in-out duration-200 hover:bg-slate-200 rounded-full flex items-center justify-center '>
          <svg className="h-[90%] w-[90%] dark:fill-white dark:bg-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        :  
       <button onClick={()=>setNavSlide(true)} type="" className='h-14 w-14 p-2 transition ease-in-out duration-200 hover:bg-slate-200 rounded-full flex items-center justify-center '>
        <FaBars className='h-[90%] w-[90%] dark:fill-white' />
       </button>
       }
       </div>
    </div>
    <div className={` absolute right-0 top-[100%] float-left border-t-2 ${navSlide ? 'w-screen':'w-0'} transition-[width] ease-in-out duration-200  h-[55vh] bg-white dark:bg-black`}>
      <ul className='flex flex-col h-full w-full justify-between dark:text-white '>
         <div className='w-full'>
          <li onClick={()=>setNavSlide(false)} className='w-full border-b-2'><Link to={`/`} className="w-full block px-2 py-4 text-center text-[1.8rem] font-semibold  hover:bg-[#8034eb] hover:text-white ">Home</Link></li>
          <li onClick={()=>setNavSlide(false)} className='w-full border-b-2'><Link to={`/blogs`} className="w-full block px-2 py-4 text-center text-[1.8rem] font-semibold  hover:bg-[#8034eb] hover:text-white ">Blog</Link></li>
          <li onClick={()=>setNavSlide(false)} className='w-full border-b-2'><Link to={`/profile`} className="w-full block px-2 py-4 text-center text-[1.8rem] font-semibold  hover:bg-[#8034eb] hover:text-white ">About Me</Link></li>  
          {userInfo?  
          <Fragment >
              <li onClick={()=>setNavSlide(false)} className='w-full border-b-2'><Link to={`/blogs/draft`} className="w-full block px-2 py-4 text-center text-[1.8rem] font-semibold  hover:bg-[#8034eb] hover:text-white ">Posts</Link></li>  
              <li onClick={()=>setNavSlide(false)} className='w-full border-b-2'><Link to={``} className="w-full block px-2 py-4 text-center text-[1.8rem] font-semibold  hover:bg-[#8034eb] hover:text-white ">Newsletter</Link></li>
          </Fragment>         
          :
          ""
        }
         </div>    
        <div className='w-full'>
         {!userInfo ?   
         <li onClick={()=>setNavSlide(false)} className='w-full'><Link to={`/login`} className="w-full block px-2 py-4 text-center text-[1.8rem] font-semibold bg-[#8034eb]  text-white ">LogIn </Link></li>
        :
         <li onClick={()=>setNavSlide(false)} className='w-full'><Link onClick={signUserOut} to={``} className="w-full block px-2 py-4 text-center text-[1.8rem] font-semibold bg-[#8034eb]  text-white ">Logout </Link></li>    
        }   
        </div>
        
      </ul>  
    </div>
</nav>
  )
}
