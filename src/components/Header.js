import React,{useState,useEffect,useRef, Fragment} from 'react'
import { FaFacebookF,FaTwitter,FaInstagram,FaLinkedinIn,FaUserCircle, FaSearch, FaBars } from 'react-icons/fa';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {  logOutUser } from '../store/users/actions';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useStateContext } from '../context/ContextProvider';
import { MobileNav } from './MobileNav';
import { MainNavbar } from './MainNavbar';


export const Header = () => {
    const [ modeDropdown, setModeDropdown ] = useState(false)
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
        {/* Main Navbar */}
     <MainNavbar 
        userInfo={userInfo} dropRef={dropRef} userDisplay={userDisplay} currentMode={currentMode} 
        setUserDisplay={setUserDisplay} signUserOut={signUserOut} modeDropdown={modeDropdown} 
        setModeDropdown={setModeDropdown} toggleMode={toggleMode}
     />
        {/* Mobile Navbar */}
        <MobileNav currentMode={currentMode}
        setModeDropdown={setModeDropdown}  
        modeDropdown={modeDropdown} 
        toggleMode={toggleMode} userInfo={userInfo}  />
    </header>
  )
}
