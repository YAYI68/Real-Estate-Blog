import React,{useState,useEffect,useRef} from 'react'
import { FaFacebookF,FaTwitter,FaInstagram,FaLinkedinIn,FaUserCircle, FaSearch } from 'react-icons/fa';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {  logOutUser } from '../store/users/actions';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useStateContext } from '../context/ContextProvider';


export const Header = () => {
    const [userDisplay,setUserDisplay] = useState(false)
    const dropRef = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userInfo } = useStateContext();

    
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
    <header className="header w-screen   flex items-center justify-center fixed  z-20 ">
        <nav className="h-full w-full bg-white lg:w-full md:hidden flex justify-between items-center py-[1.5rem] pl-6 pr-3">
            <Link to="/" className='text-[2rem] text-center font-bold text-[#8034eb] italic w-[10%]'>Blog</Link>
            <form className='w-[25%] flex items-center  h-[50%] border-2 border-[#8034eb] rounded-lg'>
                <input type="text" className='h-full w-[90%] focus:outline-none text-[1.3rem] p-2'/>
                <button className='w-[10%] flex items-center justify-center'>
                <FaSearch  className='fill-[#8034eb] w-6 h-6' />
                </button>
            </form>
            <ul className='w-[20%] gap-2 flex items-center justify-between list-none'>
                <li><Link to="/" className="text-[1.5rem] font-[400] hover:text-[#8034eb]">Home</Link></li>
                <li><Link to="/blogs" className="text-[1.5rem] font-[400] hover:text-[#8034eb]">Blog</Link></li>
                <li><Link to="/profile" className="text-[1.5rem] font-[400] hover:text-[#8034eb]">About me</Link></li> 
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
            <div className='w-[5%]'>
               <button>
                <svg className="w-8 h-8 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
               </button>
            </div>
           
        </nav>
    </header>
  )
}
