import React, { useEffect } from 'react';
import { Section } from '../components/Section';
import { FaFacebookF,FaTwitter,FaInstagram,FaLinkedinIn, FaPhoneAlt,FaTimes} from 'react-icons/fa';
import {MdEmail } from 'react-icons/md';
import { useSelector,useDispatch } from 'react-redux';
import { useStateContext } from '../context/ContextProvider';


export const Profile = ({setEditProfile, user}) => {
  const { userInfo }  = useStateContext();

  return (
    <Section className={'h-full mt-[5rem] lg:mt-[5rem] flex flex-col items-center'}>
        <div className='flex justify-around w-full mt-[5rem]   lg:flex-col lg:gap-8 lg:items-center'>
         <div className='basis-[30%] bg-white lg:w-[70%] md:w-[90%]  dark:text-white dark:bg-gray-800 shadow-lg rounded p-5'>
          <div className='w-full h-full flex flex-col items-center text-gray-600   '>
            <div className='w-[20rem] h-[20rem] my-2 rounded-full border-2 hover:border-4 hover:shadow-md cursor-pointer border-[#ff8400]'>
              <img src={user.photoURL} alt="profile" className='rounded-full' />
            </div>
            <div className='text-[1.6rem] my-[1rem]'>
            <p className='text-center text-[#8034eb] lg:font-semibold sm'>{user.displayName}</p>
            <p className='dark:text-gray-100'>{user.headLine}</p>
            </div>
            <div className='w-[50%] sm:w-[50%] lg:w-[30%] mx-auto flex items-center justify-between my-[1rem] '>
                <button onClick={()=>window.open(user.facebook,'_blank')} className=" h-full"><FaFacebookF  className='h-full text-[1.8rem] fill-[#8034eb]'/></button>
                <button onClick={()=>window.open(user.twitter,'_blank')} className="h-full"><FaTwitter className='h-full text-[1.8rem] fill-[#8034eb]' /></button>
                <button onClick={()=>window.open(user.instagram,'_blank')} className="h-full"><FaInstagram className='h-full text-[1.8rem] fill-[#8034eb]'/></button>
                <button onClick={()=>window.open(user.linkedIn,'_blank')} className="h-full"><FaLinkedinIn className='h-full text-[1.8rem] fill-[#8034eb]'/></button>
            </div>
            {userInfo.uid &&   
           <button onClick={()=>setEditProfile(true)} className='bg-[#8034eb] mt-2 text-white text-[1.5rem] rounded-lg py-5 px-[1.5rem]'>Edit Profile</button>
            }
          </div>    
         </div>
          <div className='basis-[65%]  bg-white lg:w-[70%] md:w-[90%]  dark:text-white dark:bg-gray-800  shadow-lg p-[2rem] rounded-[.5rem] '>
            <div className='w-full mt-[2rem]'>
              <p className='text-gray-600 text-[1.5rem] border-b-2 pb-[.5rem]  w-[10rem] border-[#ff8400] dark:text-gray-400'>About Me</p>
               <div className=''>
                <p className='text-[2.5rem] font-bold'>{user.displayName}</p>
                <p className='text-[1.4rem] text-[#8034eb]'>{user.headLine}</p>
               </div>
               <div className='my-[1.5rem]'>
                <p className='text-gray-600 text-[1.5rem] border-b-2 pb-[.5rem]  w-[15rem] border-[#ff8400] dark:text-gray-400'>Bio/Description</p>
                <p className='text-[1.5rem] my-3'> {user.bio}</p>
               </div>

               <div className='my-[1.5rem]'>
                <p className='text-gray-600 text-[1.5rem] border-b-2 pb-[.5rem]  w-[15rem] border-[#ff8400] dark:text-gray-400'>Contact Information</p>
                <div className='flex flex-col my-[1rem]'>
                <div className='flex items-center mb-[1rem]'>
                  <FaPhoneAlt className='text-[1.8rem] mr-3 fill-[#8034eb]' />
                  <p className='text-[1.5rem]'>{user.phoneNumber}</p>
                 </div>
                  <div className='flex items-center mb-[1rem]' >
                  <MdEmail className='text-[1.8rem] mr-3 fill-[#8034eb]' />
                    <p className='text-[1.5rem]'>{user.email}</p>
                  </div>
                </div>
               </div>
            </div>
          </div>
        </div>
      </Section>
  )
}
