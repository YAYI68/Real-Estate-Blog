import React, { useState,useEffect, useRef } from 'react';
import { Main } from '../components/Main';
import { Section } from "../components/Section";
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { auth, storage } from '../firebaseConfig';
import { getUserProfile } from '../store/users/actions';
import { ref, uploadBytesResumable,getDownloadURL,uploadBytes  } from "firebase/storage";
import { useParams,useNavigate} from "react-router-dom"
import { getPost, updateNewPost } from '../store/posts/actions';



export const CreatePost =()=>{
    const  titleRef = useRef();
    const  contentRef = useRef();
    const [file,setFile]= useState();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const postId = params.id
    
  const [preview,setPreview] = useState("")
    
  const postDetail = useSelector(state => state.postDetail)
  const { loading:detailLoading,success:detailSuccess,error:detailError,post } = postDetail

  useEffect(()=>{
        dispatch(getPost(postId))
      
  },[postId,dispatch])

   
    useEffect (()=>{
      const reader = new FileReader()
      reader.addEventListener("load", () => {
      console.log(reader.result)
      setPreview(reader.result)
      });      
  if(file){
    reader.readAsDataURL(file)
    } 
     return () => { reader.removeEventListener("load", () => {
        setPreview("")
        });}
    },[file])
    
    const getFile = (e)=>{
      setFile(e.target.files[0])
    }
    
    // const newPost = {
    //     title,
    //     content,
    //     blogState,
    //     postImage,
    //     publishAt,
    //     slug,                
    // }
    
     

    const submitHandler = (e)=>{
          e.preventDefault();
           const title = titleRef.current.value;
           const content = contentRef.current.value;
           
    }
    
const publishHandler = ()=>{

}

  return (
    <Main>
      {detailSuccess &&    
      <Section>
        <div className=' text-[1.5rem] mt-3 mx-auto px-[20rem] '>
          <div className='bg-white w-full px-[2rem] py-[2rem] overflow-y-scroll'>
          <div className='w-full py-[2rem]'>
            <div className='flex justify-between items-center '>
             <button onClick={submitHandler} className='text-white bg-[#5feb34] px-[1rem] py-2 rounded-[.5rem] w-fit'>Saved to Draft</button> 
  {/* <div role="status">
    <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
</div> */}
            <button onClick={publishHandler} className='text-white bg-[#8034eb] px-[1rem] py-3 rounded-[.5rem]'>publish</button>
            </div>
            </div>
            <form>
            <input  ref={titleRef} defaultValue={post.title}  type="text" placeholder='Title' className='text-[2rem]  focus:border-2 focus:border-solid border-none w-full my-5 rounded p-2 focus:border-[#8034eb] outline-none'/>
          <div class="flex justify-center items-center w-full">
            <label for="dropzone-file" class="flex flex-col justify-center items-center w-full h-[30rem] bg-gray-50 rounded-lg border-2 border-[#8034eb] border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div class="flex flex-col justify-center items-center pt-5 pb-6">
              {preview &&   
              <img src={preview} alt="" className=' h-full w-full' />
              }
            {/* <svg aria-hidden="true" className=" hidden mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> */}
           </div>
           <input   id="dropzone-file" type="file" onChange={getFile} className="hidden" />
          </label>
         </div>
         <div className='w-full h-[30rem] my-[3rem]'>
           <textarea ref={contentRef} defaultValue={post.content} cols="30" rows="10" placeholder='Write a story' className='w-full h-full  border-2 focus:border-solid border-none p-3 rounded focus:border-[#8034eb] outline-none '/> 
         </div>
        </form>
          </div>
        </div>
      </Section>
      }
    </Main>
  );
}















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

//     const {profile,success:successProfile} = userProfile
//     const userLogin = useSelector(state=>state.userLogin)
//     const { userInfo } = userLogin
//     const userId = userInfo.uid

    
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
