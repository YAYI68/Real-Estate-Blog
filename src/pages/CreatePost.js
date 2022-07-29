import React from 'react';
import { TextArea } from '../components/TextArea';
import { Main } from '../components/Main';
import { Section } from "../components/Section";
import { FaPlus } from 'react-icons/fa';


export const CreatePost =()=>{
  return (
    <Main>
      <Section>
        <div className=' text-[1.5rem] mt-3 mx-auto px-[20rem] '>
          <div className='bg-white w-full px-[2rem] py-[2rem]'>
            <div className='w-full py-[2rem]'>
           <div className='flex justify-between items-center'>
            <div className='flex'>
            <p>Draft in <span>Yayi</span></p> 
            <p>Saved</p>
            </div>
              <button className='text-white bg-[#8034eb] px-[1rem] py-3 rounded-[.5rem]'>publish</button>
            </div>
            </div>
            <form>
            <input type="text" placeholder='Title' className='text-[2rem] h-[7rem] focus:border-2 focus:border-solid border-none w-full my-5 rounded p-2 focus:border-[#8034eb] outline-none'/>
          <div class="flex justify-center items-center w-full">
            <label for="dropzone-file" class="flex flex-col justify-center items-center w-full h-[30rem] bg-gray-50 rounded-lg border-2 border-[#8034eb] border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div class="flex flex-col justify-center items-center pt-5 pb-6">
              <img src="" alt="" className='hidden' />
            <svg aria-hidden="true" class="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
           </div>
           <input id="dropzone-file" type="file" class="hidden" />
          </label>
         </div>
         <div className='w-full h-[30rem] my-[3rem]'>
           <textarea cols="30" rows="10" className='w-full h-full  border-2 focus:border-solid border-none p-3 rounded focus:border-[#8034eb] outline-none '/> 
         </div>
            </form>
          </div>
        </div>
        
      </Section>
    </Main>
  );
}














// import React, { useState,useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { auth, storage } from '../firebaseConfig';
// import { getUserProfile } from '../store/users/actions';
// import { ref, uploadBytesResumable,getDownloadURL  } from "firebase/storage";
// import {useParams} from "react-router-dom"
// import { getPost, updateNewPost } from '../store/posts/actions';
// import { useNavigate } from "react-router-dom";



// export const CreatePost = () => {
//   const dispatch = useDispatch()
//   const [authorProfile,setAuthorProfile] = useState({})
//     const [ title, setTitle ] = useState("")
//     const [ content, setContent] = useState("")
//     const [file,setFile]= useState("")
//     const [ postImage, setPostImage ] =useState("")
//     const [ blogState,setBlogState ] = useState("")
//     const navigate = useNavigate()
//     const userProfile = useSelector(state =>state.userProfile)
//     const postDetail = useSelector(state => state.postDetail)
//   const { loading:detailLoading,success:detailSuccess,error:detailError,post:detailPost } = postDetail
//     const {profile,success:successProfile} = userProfile
//     const userLogin = useSelector(state=>state.userLogin)
//     const { userInfo } = userLogin
//     const userId = userInfo.uid
//     const params = useParams()
//     const postId = params.id
//     const slug = title?title.replaceAll(" ","-"):""
    
//     // console.log("detailPost",detailPost.id) 
//     // console.log("postId",postId) 

//     useEffect(() => {
//       if(!userInfo){
//         navigate("/")
//       }
//       if(!detailPost.title || detailPost.id !== postId){
//         dispatch(getPost(postId))
//       }         
//       else{
//           setTitle(detailPost.title) 
//           setContent(detailPost.content)
//           setPostImage(detailPost.postImage)
//           setBlogState(detailPost.blogState)
//           const {displayName,email,photoURL,twitter,instagram,linkedin } = profile
//           setAuthorProfile({
//             displayName,
//             email,
//             photoURL,
//             twitter,
//             instagram,
//             linkedin
//           })
//          }
//          dispatch(getUserProfile(userId))
//     },[detailSuccess])
//     const publishAt = blogState === "publish"? new Date() : ""

    

//     const newPost = {
//         title,
//         content,
//         blogState,
//         postImage,
//         publishAt,
//         slug,
//         author:{
//           ...authorProfile, 
//         }
//     }

//     const uploadHandler = ()=>{
//       const storageRef = ref(storage,`/images/blog/${postId}/${file.name}`)
//       const uploadTask = uploadBytesResumable(storageRef,file)
//       uploadTask.on("state_changed",(snapshot)=>{
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log('Upload is ' + progress + '% done');
//       },
//       (error)=>{
        
//       },
//       ()=>{
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           console.log('File available at', downloadURL);
//           setPostImage(downloadURL)
//         });
//       } 
//       )

//     }


//     const submitHandler = (e)=>{
//        e.preventDefault();
//        dispatch(updateNewPost(postId,newPost))
//        console.log("blog saved to draft")
//     }
    
// const publishHandler = ()=>{
//   setBlogState("publish")
//   dispatch(updateNewPost(postId,newPost))
// }


//   return (
//     <div style={{marginTop:"4rem"}}>
//       {detailSuccess && successProfile &&         
//       <div>
//          <img src={postImage} alt=""  />
//          <button onClick={uploadHandler}>Upload</button>
//          <form onSubmit={submitHandler} style={{marginTop:"4rem"}}>
//             <div>
//               <input type="text" placeholder="Title"  value={title}  onChange={(e)=>setTitle(e.target.value)} />
//             </div>
//             <div>
//               <textarea cols="30" rows="10"  placeholder="content" value={content}  onChange={(e)=>setContent(e.target.value)}/>
//             </div>
//             <input type="file"  onChange={(e)=>setFile(e.target.files[0])}/>
//             <button>Draft</button>
//           </form>
//       </div>
//       }
//         <button onClick={publishHandler}>publish</button>
//     </div>
//   )
// }
