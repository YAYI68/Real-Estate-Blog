


import { updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useRef, useState, useEffect } from 'react'
import { AiFillCamera } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Main } from '../components/Main'
import { Section } from '../components/Section'
import { auth, db, storage } from '../firebaseConfig'
import { updateUserProfile } from '../store/users/actions'



export const EditProfile = ({setEditProfile,user}) => {
   const dispatch = useDispatch();
   const [previewPics, setPreviewPics] = useState("")
   const [ imgFile,setImgFile ] = useState("");
   const displayNameRef = useRef();
   const emailRef = useRef();
   const headLineRef = useRef();
   const bioRef = useRef();
   const facebookRef = useRef();
   const twitterRef = useRef();
   const instagramRef = useRef();
   const linkedInRef = useRef();
   const phoneNumberRef = useRef();
   
  
   const getFile = (e)=>{
    setImgFile(e.target.files[0])
  }

   useEffect(()=>{
    const reader = new FileReader()
    reader.addEventListener("load", () => {
      setPreviewPics(reader.result)
    });
    if(imgFile){
      reader.readAsDataURL(imgFile)
      } 
      return () => {
        reader.removeEventListener('load', () => {
          setPreviewPics("")
        });
      }
   },[imgFile])



   const handleSubmit = async(e)=>{
    e.preventDefault();
    const displayName = displayNameRef.current.value;
    const email = emailRef.current.value
    const headLine = headLineRef.current.value
    const bio = bioRef.current.value
    const phoneNumber = phoneNumberRef.current.value
    const twitter =  twitterRef.current.value
    const facebook = facebookRef.current.value
    const instagram = instagramRef.current.value
    const linkedIn = linkedInRef.current.value
    const file = imgFile
   
    console.log("Save was clicked")

    const data = {
      uid:auth.currentUser.uid,
      displayName,
      email,
      headLine,
      bio,
      phoneNumber,
      twitter,
      facebook,
      instagram, 
      linkedIn
    }

  if(imgFile){
    try { 
    const storageRef = ref(storage, `user/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file); 
     uploadTask.on(
      (error) => {
        // setError(true);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
          console.log('File available at', downloadURL);
          await updateProfile(auth.currentUser,{
            displayName,
            photoURL: downloadURL,
          });
          await setDoc(doc(db,"users",auth.currentUser.uid),{
            uid:auth.currentUser.uid,
            ...data,
            photoURL:downloadURL,
          }) 
  
        });
      }
    );  
      } catch (error) {
        
      }
  }else{
    await updateProfile(auth.currentUser,{
      displayName,
      photoURL: user.photoURL,
    });
    await setDoc(doc(db,"users",auth.currentUser.uid),{
      uid:auth.currentUser.uid,
      photoURL:user.photoURL,
      ...data,
    }) 
  }

   }

     
    





  return (
    <Main>
     <Section >
     <div  onClick={()=>setEditProfile(false)} className='fixed z-[20]  w-[100vw]  h-[100vh] bg-[rgb(0,0,0,0.69)]  left-0 top-0  flex items-center justify-center'></div>
     <div   className='fixed z-[25]  w-[50%]  h-[100vh] top-0 left-[30%] flex items-center justify-center'>
      <div className='w-[50%] h-[85%] m-auto bg-[white]  rounded flex flex-col fixed '>
        <div className='flex p-[1rem] justify-between  border-b-2'>
         <div className='flex items-center basis-[30%]'>
           <button onClick={()=>setEditProfile(false)} className='mr-4'><FaTimes className='text-[2.5rem] fill-[#8034eb] '/></button>
           <p className='text-[2rem] font-bold'>EditProfile</p>
         </div>
          <button onClick={handleSubmit} className="py-3 px-8 rounded-[.5rem] text-[1.5rem]  bg-[#8034eb] text-white ">Save</button>
        </div>
        <div className='bg-white flex-grow overflow-y-scroll pb-[6rem]'>
        <form className='flex flex-col w-full h-full p-4' onSubmit={handleSubmit}>
          <div className='h-[15rem] w-[15rem] mx-auto  mt-[2rem] cursor-pointer hover:scale-[1.2] transition-[transform]'>
          <label for='editProfile' className=' cursor-pointer mb-4'>
          <div className='border-4 h-[13rem] w-[13rem]   border-[#ff8400] rounded-full mx-auto relative mt-[1rem] p-2'>
           <div className='w-full h-full bg-[blue]   rounded-full '>
            <img src={previewPics ? previewPics : user.photoURL} alt="" className='w-full h-full rounded-full' />
           </div>
           <button className='left-1/2 bottom-0 absolute  h-[3rem] w-[3rem] rounded-full bg-black flex items-center justify-center translate-y-1/2'><AiFillCamera className='h-[2rem] w-[2rem] fill-white'/></button>
          </div>
           <input onChange={getFile} type="file" id='editProfile' className='hidden' />
          </label>
          <p className='text-center text-[1.6rem] font-bold mt-5'>Change Image</p>
          </div>
          <div className='flex justify-between mt-[5rem]'>
            <div className='basis-[47%]'>
            <label for='firstName' className='text-[1.5rem] text-gray-600 mb-2'>Display Name</label>
            <input id='firstName' type="text" 
             defaultValue={user.displayName}
             ref={displayNameRef} 
            className='w-full text-[1.5rem] h-[4rem] outline-none bg-gray-200 p-2 border-2 rounded focus:border-[#8034eb]'
             placeholder='Display Name'/>
            </div>
            <div className='basis-[47%]'>
            <label for='lastName' className='text-[1.5rem] text-gray-600 mb-2'>Email</label>
            <input id='lastName' type="email"  
            defaultValue={user.email}
            ref={emailRef}
            className='w-full text-[1.5rem] h-[4rem] outline-none bg-gray-200 p-2 rounded border-2 focus:border-[#8034eb]' 
            placeholder='Email'/>
            </div>
          </div>
          <div className='mt-[2rem]'>
            <label className='text-[1.5rem] text-gray-600 mb-2'>Headline</label>
            <input type="text"
            defaultValue={user.headLine}
             ref={headLineRef}
             className='w-full text-[1.5rem] h-[4rem] outline-none bg-gray-200 p-2 border-2 rounded focus:border-[#8034eb]'/>
          </div>

          <div className='mt-[2rem]'>
            <label className='text-[1.5rem] text-gray-600 mb-2'>Bio</label>
            <textarea cols="30" rows="5" 
            defaultValue={user.bio}
             ref={bioRef}
             className='w-full text-[1.5rem]  outline-none bg-gray-200 p-2 border-2 rounded focus:border-[#8034eb]'
             placeholder='A bit about yourself' />
          </div>

          <div className='mt-[2rem]'>
            <label className='text-[1.5rem] text-gray-600 mb-2'>Facebook</label>
            <input type="text" 
            defaultValue={user.facebook}
             ref={facebookRef}
            className='w-full text-[1.5rem] h-[4rem] outline-none bg-gray-200 p-2 border-2 rounded focus:border-[#8034eb]' 
            placeholder='Your facebook url link'/>
          </div>

          <div className='mt-[2rem]'>
            <label className='text-[1.5rem] text-gray-600 mb-2'>Instagram</label>
            <input type="text" 
            defaultValue={user.instagram}
            ref={instagramRef}
            className='w-full text-[1.5rem] h-[4rem] outline-none bg-gray-200 p-2 border-2 rounded focus:border-[#8034eb]' 
            placeholder='Your instagram url link'/>
          </div>

          <div className='mt-[2rem]'>
            <label className='text-[1.5rem] text-gray-600 mb-2'>LinkedIn</label>
            <input type="text"
            defaultValue={user.linkedIn}
            ref={linkedInRef} 
            className='w-full text-[1.5rem] h-[4rem] outline-none bg-gray-200 p-2 rounded border-2 focus:border-[#8034eb]' 
            placeholder='Your LinkedIn url link'/>
          </div>

          <div className='mt-[2rem]'>
            <label className='text-[1.5rem] text-gray-600 mb-2'>Twitter</label>
            <input type="text" 
            defaultValue={user.twitter}
            ref={twitterRef}
            className='w-full text-[1.5rem] h-[4rem] outline-none bg-gray-200 rounded p-2 border-2 focus:border-[#8034eb]' 
            placeholder='Your Twitter url link'/>
          </div>

          <div className='mt-[2rem]'>
            <label className='text-[1.5rem] text-gray-600 mb-2'>Phone Number</label>
            <input type="text"
            defaultValue={user.phoneNumber}
            ref={phoneNumberRef} 
            className='w-full text-[1.5rem] h-[4rem] outline-none bg-gray-200 rounded p-2 border-2 focus:border-[#8034eb]' 
            placeholder='Your Phone Number'/>
          </div>
          <div className='mt-[2rem] mb-[2rem]'>
           <button className="py-3 px-8 rounded-[.5rem] text-[1.5rem]  bg-[#8034eb] text-white ">Save</button>
          </div>
        </form>      
        </div>
      </div>          
    </div>
     </Section>
    </Main>
  )
}




