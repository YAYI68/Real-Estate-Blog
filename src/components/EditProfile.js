


import React, { useRef, useState, useEffect } from 'react'
import { AiFillCamera } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'
import { Main } from '../components/Main'
import { Section } from '../components/Section'



export const EditProfile = ({setEditProfile}) => {
   const [ file,setFile ] = useState();
   const firtNameRef = useRef();
   const lastNameRef = useRef();
   const headLine = useRef();
   const BioRef = useRef();
   const facebookRef = useRef();
   const twitterRef = useRef();
   const instagramRef = useRef();
   const linkedinRef = useRef();
   const phoneNumberRef = useRef();

   useEffect(()=>{


   },[])


   const submitHandler = (e)=>{
         e.preventDefault();

    
    
     

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
            
          </div>
        </form>      
        </div>
      </div>          
    </div>
     </Section>
    </Main>
  )
}









// import React,{useState,useEffect} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { auth, db } from '../firebaseConfig';
// import { useNavigate } from "react-router-dom";
// import { getUserProfile, updateUserProfile } from '../store/users/actions';
// import { updateProfile } from 'firebase/auth';
// import { doc, updateDoc } from 'firebase/firestore';
// import { ref, uploadBytesResumable,getDownloadURL  } from "firebase/storage";
// import { storage } from '../firebaseConfig';






// export const EditProfile = () => {
//     const [displayName,setDisplayName] = useState("")
//     const [email,setEmail] = useState("")
//     const [file,setFile] =useState("")
//     const [photoURL,setPhotoURL] = useState("")
//     const [twitter, setTwitter] = useState("")
//     const [instagram,setInstagram] = useState("")
//     const [linkedIn,setLinkedin] = useState("")
//     const [description,setDescription] = useState("")
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const userLogin = useSelector(state => state.userLogin)
//     const userProfile = useSelector(state=>state.userProfile)
//     const updatedProfile = useSelector(state=>state.updatedProfile)
//     const {loading:loadingUpdate,success:successUpdate,profileUpdate,error:errorUpdate}=updatedProfile
//     const {loading,success,error,profile} = userProfile
//     const { userInfo } = userLogin
//     console.log("from profile", userInfo.uid)
//     console.log("from profile",profile)
//     const userId = userInfo.uid
   
//     // const uploadImage = async()=>{
//     //     const url = await getDownloadURL(storageRef)
//     //     setPhotoURL(url)
//     // }
//     console.log(successUpdate)

//     useEffect(()=>{
//         if(successUpdate){
//             navigate("/profile")
//         }
//         if(!userInfo){
//             navigate("/")
//         }
//         if(profile && profile.id === userId){
//                 setDisplayName(profile.displayName)
//                 setEmail(profile.email)
//                 setPhotoURL(profile.photoURL)
//                 setTwitter(profile.twitter)
//                 setInstagram(profile.instagram)
//                 setLinkedin(profile.linkedIn)
//                 setDescription(profile.description)
//             } 
//         else{
//             dispatch(getUserProfile(userId))        
//         }
//     },[userInfo,profile,dispatch,navigate,userId,successUpdate])
  
//    const  uploadHandler = ()=>{
//     const storageRef = ref(storage,`image/${userInfo.uid}/${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);
//      uploadTask.on('state_changed', (snapshot) => {
//     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log('Upload is ' + progress + '% done');
//   }, 
//   (error) => {
//     // Handle unsuccessful uploads
//   }, 
//   () => {
//     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//       console.log('File available at', downloadURL);
//       setPhotoURL(downloadURL)
//     });
//   }
// );
//    }

//    const data = {
//     displayName,
//     email,
//     photoURL,
//     twitter,
//     instagram,
//     linkedIn,
//     description
// }
//     const submitHandler = async (e)=>{
//         e.preventDefault();
//         dispatch (updateUserProfile(data,userId)) 
//         console.log("Profile Updated")
//     }

//   return (
//     <div style={{marginTop:"5rem"}}>
//        {success &&
//        <div>
//            <form onSubmit={submitHandler}>
//                <div>
//                <input type="text" value={displayName} onChange={(e)=>setDisplayName(e.target.value)} />
//                </div>
//                <div>
//                <input type="email"  placeholder="Email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
//                </div>
//                <div>
//                <input type="file" placeholder="" onChange={(e)=>setFile(e.target.files[0])} />
//                </div>
//                <div>
//                <input type="text"  placeholder="twitter"  value={twitter} onChange={(e)=>setTwitter(e.target.value)}/>
//                </div>
//                <div>
//                <input type="text" placeholder="instagram" value={instagram}  onChange={(e)=>setInstagram(e.target.value)} />
//                </div>
//                <div>
//                <input type="text" placeholder="linkedIn" value={linkedIn}  onChange={(e)=>setLinkedin(e.target.value)}/>
//                </div>
//                <div> 
//                <textarea cols="30" rows="10" placeholder="Bio"   value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
//                </div>
//                <button>Save</button>
//            </form>
//            <img src={photoURL} alt="" />
//            <button onClick={uploadHandler}>Upload</button>
//        </div>       
//        }
//     </div>
//   )
// }
