import React,{useState} from 'react'
import { Main } from '../components/Main'
import { Section } from '../components/Section';
import { FaFacebookF,FaTwitter,FaInstagram,FaLinkedinIn, FaPhoneAlt,FaTimes} from 'react-icons/fa';
import {MdEmail,MdLocationOn } from 'react-icons/md';
import { AiFillCamera } from "react-icons/ai";




export const UserProfile = () => {
  const [editProfile,setEditProfile] = useState(false)
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
          <div className='basis-[65%] h-[20rem] bg-white min-h-[40rem] shadow-lg p-[2rem] rounded-[.5rem] '>
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
    </Main>
    {editProfile &&   
    <div  onClick={()=>setEditProfile(false)} className='fixed z-[20]  w-[100vw]  h-[100vh] bg-[rgb(0,0,0,0.69)]  left-0 top-0  flex items-center justify-center'>
      <div className='w-[50%] h-[85%] m-auto bg-[white]  rounded flex flex-col fixed '>
        <div className='flex p-[1rem] justify-between  border-b-2'>
         <div className='flex items-center basis-[30%]'>
           <button onClick={()=>setEditProfile(false)} className='mr-4'><FaTimes className='text-[2.5rem] fill-[#8034eb] '/></button>
           <p className='text-[2rem] font-bold'>EditProfile</p>
         </div>
          <button className="py-3 px-8 rounded-[.5rem] text-[1.5rem]  bg-[#8034eb] text-white ">Save</button>
        </div>
        <div className='bg-white flex-grow overflow-y-scroll pb-[6rem]'>
        <form className='flex flex-col w-full h-full p-4'>
          <div className='h-[15rem] w-[15rem] mx-auto  mt-[2rem] cursor-pointer hover:scale-[1.2] transition-[transform]'>
          <label for='editProfile' className=' cursor-pointer mb-4'>
          <div className='border-4 h-[13rem] w-[13rem]   border-[#ff8400] rounded-full mx-auto relative mt-[1rem] p-2'>
           <div className='w-full h-full bg-[blue]   rounded-full '>
            <img src="./images/default.jpg" alt="" className='w-full h-full rounded-full' />
           </div>
           <button className='left-1/2 bottom-0 absolute  h-[3rem] w-[3rem] rounded-full bg-black flex items-center justify-center translate-y-1/2'><AiFillCamera className='h-[2rem] w-[2rem] fill-white'/></button>
          </div>
          <input type="file" id='editProfile' className='hidden' />
          </label>
          <p className='text-center text-[1.6rem] font-bold mt-5'>Change Image</p>
          </div>
          <div className='flex justify-between mt-[5rem]'>
            <div className='basis-[47%]'>
            <label for='firstName' className='text-[1.5rem] text-gray-600 mb-2'>First Name</label>
            <input id='firstName' type="text"  className='w-full text-[1.5rem] h-[4rem] outline-none bg-gray-200 p-2 border-2 rounded focus:border-[#8034eb]' placeholder='First Name'/>
            </div>
            <div className='basis-[47%]'>
            <label for='lastName' className='text-[1.5rem] text-gray-600 mb-2'>Last Name</label>
            <input id='lastName' type="text"  className='w-full text-[1.5rem] h-[4rem] outline-none bg-gray-200 p-2 rounded border-2 focus:border-[#8034eb]' placeholder='Last Name'/>
            </div>
          </div>
          <div className='mt-[2rem]'>
            <label className='text-[1.5rem] text-gray-600 mb-2'>Headline</label>
            <input type="text" className='w-full text-[1.5rem] h-[4rem] outline-none bg-gray-200 p-2 border-2 rounded focus:border-[#8034eb]'/>
          </div>

          <div className='mt-[2rem]'>
            <label className='text-[1.5rem] text-gray-600 mb-2'>Bio</label>
            <textarea cols="30" rows="5" className='w-full text-[1.5rem]  outline-none bg-gray-200 p-2 border-2 rounded focus:border-[#8034eb]' placeholder='A bit about yourself' />
          </div>

          <div className='mt-[2rem]'>
            <label className='text-[1.5rem] text-gray-600 mb-2'>Facebook</label>
            <input type="text" className='w-full text-[1.5rem] h-[4rem] outline-none bg-gray-200 p-2 border-2 rounded focus:border-[#8034eb]' placeholder='Your facebook url link'/>
          </div>

          <div className='mt-[2rem]'>
            <label className='text-[1.5rem] text-gray-600 mb-2'>Instagram</label>
            <input type="text" className='w-full text-[1.5rem] h-[4rem] outline-none bg-gray-200 p-2 border-2 rounded focus:border-[#8034eb]' placeholder='Your instagram url link'/>
          </div>

          <div className='mt-[2rem]'>
            <label className='text-[1.5rem] text-gray-600 mb-2'>LinkedIn</label>
            <input type="text" className='w-full text-[1.5rem] h-[4rem] outline-none bg-gray-200 p-2 rounded border-2 focus:border-[#8034eb]' placeholder='Your LinkedIn url link'/>
          </div>

          <div className='mt-[2rem]'>
            <label className='text-[1.5rem] text-gray-600 mb-2'>Twitter</label>
            <input type="text" className='w-full text-[1.5rem] h-[4rem] outline-none bg-gray-200 rounded p-2 border-2 focus:border-[#8034eb]' placeholder='Your Twitter url link'/>
          </div>

          
          <div className='mt-[2rem]'>
            <label className='text-[1.5rem] text-gray-600 mb-2'>Phone Number</label>
            <input type="text" className='w-full text-[1.5rem] h-[4rem] outline-none bg-gray-200 rounded p-2 border-2 focus:border-[#8034eb]' placeholder='Your Phone Number'/>
          </div>
          
          <div className='mt-[2rem] mb-[2rem]'>
            <label className='text-[1.5rem] text-gray-600 mb-2'>Address</label>
            <input type="text" className='w-full text-[1.5rem] h-[4rem] outline-none rounded bg-gray-200 p-2 border-2 focus:border-[#8034eb]' placeholder='Your Location '/>
          </div>
          <div className='mt-[2rem] mb-[2rem]'>
            
          </div>
        </form>      
        </div>
      </div>          
    </div>
    }
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
