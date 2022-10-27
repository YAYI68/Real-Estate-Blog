import React,{useState,useEffect,useRef, Fragment} from 'react'
import { FaFacebookF,FaTwitter,FaInstagram,FaLinkedinIn,FaUserCircle, FaSearch, FaBars } from 'react-icons/fa';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {  logOutUser } from '../store/users/actions';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useStateContext } from '../context/ContextProvider';


export const Header = () => {
    const [ modeDropdown, setModeDropdown ] = useState(false)
    const [navSlide, setNavSlide] = useState(false);
    const [userDisplay,setUserDisplay] = useState(false)
    const {currentMode,setMode,userInfo} =  useStateContext();

    const dropRef = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const toggleMode = (mode)=>{
        setMode(mode);
        setModeDropdown(false);
      }
    
   useEffect(() => {
    const closeSlider = (e)=>{
        if(dropRef.current && dropRef.current.contains(e.target)){
         return;
        }
        setUserDisplay(false)
    }
     document.addEventListener('mousedown',closeSlider)
     
     return () => {
        document.removeEventListener("mousedown",closeSlider)
     }
   },[])
   
   const signUserOut = async()=>{
       await signOut(auth)
        dispatch(logOutUser()) 
        localStorage.removeItem('userInfo') 
        console.log('logOut Is Pressed')
        navigate('/login')
      }

  return (
    <header className="header w-screen top-0 left-0  flex items-center justify-center fixed  z-20 ">
        <nav className="h-full w-full dark:bg-black bg-white lg:w-full md:hidden flex justify-between items-center py-[1.5rem] pl-6 pr-3">
            <Link to="/" className='text-[2rem] text-center font-bold text-[#8034eb] italic w-[10%]'>Blog</Link>
            <form className='w-[25%] flex items-center  h-[50%] border-2 border-[#8034eb] rounded-lg'>
                <input type="text" className='h-full w-[90%] focus:outline-none text-[1.3rem] p-2'/>
                <button className='w-[10%] flex items-center justify-center'>
                <FaSearch  className='fill-[#8034eb] w-6 h-6' />
                </button>
            </form>
            <ul className='w-[20%] gap-2 flex items-center justify-between list-none'>
                <li><Link to="/" className="text-[1.5rem] font-medium dark:hover:text-[#8034eb] hover:text-[#8034eb] dark:text-white">Home</Link></li>
                <li><Link to="/blogs" className="text-[1.5rem] font-medium dark:hover:text-[#8034eb] hover:text-[#8034eb] dark:text-white">Blog</Link></li>
                <li><Link to="/profile" className="text-[1.5rem] font-medium dark:hover:text-[#8034eb] hover:text-[#8034eb] dark:text-white">About me</Link></li> 
            </ul>
            <div className='w-[10%] h-[50%] flex items-center gap-5'>
                <button className="h-full"><FaFacebookF  className=' w-5 h-5 fill-[#8034eb]'/></button>
                <button className="h-full"><FaTwitter className='w-5 h-5 fill-[#8034eb]' /></button>
                <button className="h-full"><FaInstagram className='w-5 h-5 fill-[#8034eb]'/></button>
                <button className="h-full"><FaLinkedinIn className='w-5 h-5 fill-[#8034eb]'/></button>
            </div>  
            {userInfo &&   
            <div className='h-[50%] w-[7%] relative'>
                <div className='h-[40%] w-[40%] rounded-full cursor-pointer' onClick={()=>setUserDisplay(!userDisplay)}>
                    <img src={userInfo.photoURL?userInfo.photoURL:"./images/default.jpg"} className='w-full h-full rounded-full' alt="" />
                </div>
                {userDisplay && 
                <div ref={dropRef}  onClick={()=>setUserDisplay(false)} className='absolute w-[15rem] top-[110%]  flex flex-col bg-white text-[#8034eb] right-[5%] rounded-[.5rem]   shadow-md '>
                    <Link to="/profile" className='text-[1.5rem] py-[.5rem] text-center border-b-2 hover:bg-[#8034eb] hover:text-white'>Profile</Link>
                    <Link to="/blogs/draft"  className='text-[1.5rem] py-[.5rem] text-center border-b-2 hover:bg-[#8034eb] hover:text-white'>post</Link>
                    <Link to="/newsletter"  className='text-[1.5rem] py-[.5rem] text-center hover:bg-[#8034eb] hover:text-white'>Newsletter</Link>
                    <Link to="" onClick={signUserOut} className='text-[1.5rem] py-[.5rem] text-center hover:bg-[#8034eb] hover:text-white'>logout</Link>
                </div>
                }
            </div>
          }
            {!userInfo &&
            <ul className='w-[5%] flex items-center justify-between list-none mr-[1.5rem]'>
            <li className='w-fit border-[1px] border-[#8034eb] hover:bg-[#8034eb] flex justify-center items-center px-3 py-2 rounded text-[#8034eb] hover:text-white'><Link to="/login" className="text-[1.5rem]  font-[400] hover:text-[white]">Login</Link></li> 
            </ul>
           } 
     <div className='relative flex items-center justify-center w-[10%]'>
        <button className="bg-[#8034eb]" onClick={()=>setModeDropdown(!modeDropdown)} type="" className='w-10 h-10'>
        {currentMode === "Dark" ?
        <svg className="w-full h-full fill-[#8034eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
        :
        <svg className="w-full h-full fill-[#8034eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
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
           
        </nav>
        {/* Mobile Navbar */}
        <nav className='h-full w-full bg-white hidden  md:flex py-[1.5rem] items-center  justify-between relative'>
            <h3 className='text-[#8034eb] text-[2rem] ml-6'>Blog</h3>
            <div className='flex gap-10 mr-3'>
        <div className='relative flex items-center justify-center'>
        <button onClick={()=>setModeDropdown(!modeDropdown)} type="" className='w-10 h-10'>
        {currentMode === "Dark" ?
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
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
                  <svg className="h-[90%] w-[90%]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                :  
               <button onClick={()=>setNavSlide(true)} type="" className='h-14 w-14 p-2 transition ease-in-out duration-200 hover:bg-slate-200 rounded-full flex items-center justify-center '>
                <FaBars className='h-[90%] w-[90%] ' />
               </button>
               }
               </div>
            </div>
            <div className={` absolute right-0 top-[100%] float-left border-t-2 ${navSlide ? 'w-screen':'w-0'} transition-[width] ease-in-out duration-200  h-[55vh] bg-white dark:bg-black`}>
              <ul className='flex flex-col h-full w-full justify-between'>
                 <div className='w-full'>
                  <li className='w-full border-b-2'><Link to={``} className="w-full block px-2 py-4 text-center text-[1.5rem] font-semibold  hover:bg-[#8034eb] hover:text-white ">Home</Link></li>
                  <li className='w-full border-b-2'><Link to={``} className="w-full block px-2 py-4 text-center text-[1.5rem] font-semibold  hover:bg-[#8034eb] hover:text-white ">Blog</Link></li>
                  <li className='w-full border-b-2'><Link to={``} className="w-full block px-2 py-4 text-center text-[1.5rem] font-semibold  hover:bg-[#8034eb] hover:text-white ">About Me</Link></li>  
                  {/* If user is signIn                   */}
                  {/* <li className='w-full border-b-2'><Link to={``} className="w-full block px-2 py-4 text-center text-[1.5rem] font-semibold  hover:bg-[#8034eb] hover:text-white ">Posts</Link></li>  
                  <li className='w-full border-b-2'><Link to={``} className="w-full block px-2 py-4 text-center text-[1.5rem] font-semibold  hover:bg-[#8034eb] hover:text-white ">Newsletter</Link></li>   */}
                 </div>    
                <div className='w-full'>
                 <li className='w-full border-b-2'><Link to={``} className="w-full block px-2 py-4 text-center text-[1.5rem] font-semibold bg-[#8034eb]  text-white ">LogIn </Link></li>  
                </div>
                
              </ul>  
            </div>
        </nav>
    </header>
  )
}
