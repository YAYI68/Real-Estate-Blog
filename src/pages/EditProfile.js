


import React from 'react'
import { Main } from '../components/Main'
import { Section } from '../components/Section'

export const EditProfile = () => {
  return (
    <Main>
     <Section >
      <div className='w-[80%] mx-auto min-h-max bg-white'>
        <div>
          <form>
            
          </form>
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
