import React,{useEffect, useState} from 'react'
import { Main } from '../components/Main'
import { Section } from '../components/Section';
import { FaFacebookF,FaTwitter,FaInstagram,FaLinkedinIn, FaPhoneAlt,FaTimes} from 'react-icons/fa';
import {MdEmail,MdLocationOn } from 'react-icons/md';
import { AiFillCamera } from "react-icons/ai";
import { useSelector,useDispatch } from 'react-redux';

import { EditProfile } from '../components/EditProfile';



export const UserProfile = () => {
  const [editProfile,setEditProfile] = useState(false)
  
 
 useEffect(() => {

   return () => {
     
   }
 }, [])
 
  return (
    <>
     <Main>
      <Section>
        <div className='flex justify-around w-[90%] mt-[5rem]'>
         <div className='basis-[30%] bg-white shadow-lg rounded p-5'>
          <div className='w-full h-full flex flex-col items-center text-gray-600'>
            <div className='w-[20rem] h-[20rem] my-2 rounded-full border-2 hover:border-4 hover:shadow-md cursor-pointer border-[#ff8400]'>
              <img src="./images/default.jpg" alt="profile" className='rounded-full' />
            </div>
            <div className='text-[1.6rem] my-[1rem]'>
            <p className='text-center text-[#8034eb]'>Yayi Abiodun</p>
            <p>Software Developer</p>
            </div>
            <div className='w-[50%] mx-auto flex items-center justify-between my-[1rem]'>
                <button className="h-full"><FaFacebookF  className='h-full text-[1.8rem] fill-[#8034eb]'/></button>
                <button className="h-full"><FaTwitter className='h-full text-[1.8rem] fill-[#8034eb]' /></button>
                <button className="h-full"><FaInstagram className='h-full text-[1.8rem] fill-[#8034eb]'/></button>
                <button className="h-full"><FaLinkedinIn className='h-full text-[1.8rem] fill-[#8034eb]'/></button>
            </div>
           <button onClick={()=>setEditProfile(true)} className='bg-[#8034eb] mt-2 text-white text-[1.5rem] rounded-lg py-5 px-[1.5rem]'>Edit Profile</button>
          </div>    
         </div>
          <div className='basis-[65%]  bg-white  shadow-lg p-[2rem] rounded-[.5rem] '>
            <div className='w-full mt-[2rem]'>
              <p className='text-gray-600 text-[1.5rem] border-b-2 pb-[.5rem]  w-[10rem] border-[#ff8400]'>About Me</p>
               <div className=''>
                <p className='text-[2.5rem] font-bold'>Yayi Abiodun</p>
                <p className='text-[1.4rem] text-[#8034eb]'>Software developer</p>
               </div>
               <div className='my-[1.5rem]'>
                <p className='text-gray-600 text-[1.5rem] border-b-2 pb-[.5rem]  w-[15rem] border-[#ff8400]'>Bio/Description</p>
                <p className='text-[1.5rem] my-3'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, quo cupiditate earum perferendis quibusdam ex vitae autem, veritatis dolorum excepturi asperiores! Ut, officia ipsam? Cumque aliquid ipsum reprehenderit dolores aperiam. </p>
               </div>

               <div className='my-[1.5rem]'>
                <p className='text-gray-600 text-[1.5rem] border-b-2 pb-[.5rem]  w-[15rem] border-[#ff8400]'>Contact Information</p>
                <div className='flex flex-col my-[1rem]'>
                <div className='flex items-center mb-[1rem]'>
                  <FaPhoneAlt className='text-[1.8rem] mr-3 fill-[#8034eb]' />
                  <p className='text-[1.5rem]'>+2347088542026</p>
                 </div>
                  <div className='flex items-center mb-[1rem]' >
                  <MdEmail className='text-[1.8rem] mr-3 fill-[#8034eb]' />
                  <p className='text-[1.5rem]'>yayiabiodun68@gmail.com</p>
                  </div> 
                  <div className='flex items-center mb-[1rem]' >
                  <MdLocationOn className='text-[1.8rem] mr-3 fill-[#8034eb]' />
                  <p className='text-[1.5rem]'>12,masaba close Unilag,yaba lagos, Nigeria </p>
                  </div>
                </div>
               </div>
            </div>
          </div>
        </div>
      </Section>
    {editProfile &&   
    <EditProfile setEditProfile={setEditProfile}/>
    }
    </Main>
    </>
  )
}


















// import React,{useEffect, useState} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { allPosts } from '../store/posts/actions';
// import { getUserProfile, USER_UPDATE_RESET } from '../store/users/actions';





// export const UserProfile = () => {
//     const [name,setName] = useState("")
//     const [email,setEmail] = useState("")
//     const [photoURL,setPhotoURL] = useState("")
//     const [twitter, setTwitter] = useState("")
//     const [instagram,setIntagram] = useState("")
//     const [linkedin,setLinkedin] = useState("")
//     const userLogin = useSelector(state => state.userLogin)
//     const { userInfo } = userLogin
//     const dispatch = useDispatch()
//     const userId = userInfo.uid

//     const postList = useSelector(state =>state.postList)
//     const { posts } = postList
//     // const { author }= posts

//     const userProfile = useSelector(state =>state.userProfile)
//     const {loading,error,success,profile} = userProfile

//     console.log("profile",profile)
//     console.log("user",posts)
    


//  useEffect(()=>{
//    dispatch(getUserProfile(userId))
//    dispatch({type:USER_UPDATE_RESET})
    
//     //  dispatch(allPosts())
//  },[])



//   return (
//     <div>
//       <p>My Profile</p>
//       {success &&     
//         <div>
//         <p>{profile.displayName}</p>
//         <p>{profile.email}</p>
//         <p>{profile.photoURL}</p>
//         <p>twitter</p>
//         <p>instagram</p>
//         <p>linkedin</p>
//         </div>
//       }
//     </div>
//   )
// }
