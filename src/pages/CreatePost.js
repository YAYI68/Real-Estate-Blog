import React, { useState,useEffect, useRef, Fragment } from 'react';
import { Main } from '../components/Main';
import { Section } from "../components/Section";
import { FaPlus, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db, storage } from '../firebaseConfig';
import { getUserProfile } from '../store/users/actions';
import { ref, uploadBytesResumable,getDownloadURL,uploadBytes  } from "firebase/storage";
import { useParams,useNavigate} from "react-router-dom"
import { getPost, updateNewPost } from '../store/posts/actions';
import { doc, Timestamp, updateDoc } from 'firebase/firestore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from 'draft-js';




const  modules  = {
  toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script:  "sub" }, { script:  "super" }],
      ["blockquote", "code-block"],
      [{ list:  "ordered" }, { list:  "bullet" }],
      [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
  ],
}


export const CreatePost =()=>{
    const  titleRef = useRef();
    const  contentRef = useRef();
    const [imgFile,setImgFile]= useState("");
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const postId = params.id
    const [preview,setPreview] = useState("")
    const postDetail = useSelector(state => state.postDetail)
    const { loading:detailLoading,success:detailSuccess,error:detailError,blog } = postDetail
    const [value, setValue] = useState("");


  useEffect(()=>{
    if(!auth.currentUser){
      navigate("/login")
    }    
        dispatch(getPost(postId))  
  },[postId,dispatch,navigate])

    useEffect (()=>{
      const reader = new FileReader()
      reader.addEventListener("load", () => {
      setPreview(reader.result)
      });      
  if(imgFile){
    reader.readAsDataURL(imgFile)
    } 
     return () => { reader.removeEventListener("load", () => {
        setPreview("")
        });}
    },[imgFile])
    
    const getFile = (e)=>{
      setImgFile(e.target.files[0])
    }
    const submit = async(state,date)=>{
      const title = titleRef.current.value;
      const content = value;
      const file = imgFile;
      const slug = title.toLowerCase().replaceAll(" ","_")
      const excerpts = content.substr(0,100)
      const postRef = doc(db,"posts",`${postId}`) 
      const data = {
        title,
        excerpts,
        content,
        blogState:state,
        publishAt:date?Timestamp.fromDate(new Date()):"",
        slug,      
      }

      if(imgFile){
        const storageRef =  ref(storage, `blog/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file); 
         uploadTask.on(
          (error) => {
            // setError(true);
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
              await updateDoc(postRef,{
                ...data,
                imageURL:downloadURL,
              })
              navigate('/blogs/draft')
            });
          }
        );  
      }else{
        await updateDoc(postRef,{
          ...data,
          imageURL:blog.imageURL,
        })
        navigate('/blogs/draft')
      }

    }
    // console.log({value})

    const publishHandler = async(e)=>{
      e.preventDefault();
      await submit("publish",Timestamp)
      console.log("Published was clicked")
     }

    const submitHandler = async(e)=>{
          e.preventDefault();
          await submit("draft","")
          console.log("Draft was clicked")
    }
    
    const closePreview = ()=>{
      setPreview("")
    }

    
  
  return (
    <Main>
      {detailSuccess &&    
      <Section className={`mt-[5rem]`}>
        <div className='w-screen text-[1.5rem] lg:px-2  flex flex-col items-center'>
          <div className='bg-white dark:bg-slate-900 w-[70%] md:w-full lg:w-[90%] lg:p-[1rem] px-[2rem] py-[2rem]'>
            <div className='w-full py-[2rem] sticky top-[7rem] md:top-[6.3rem] left-0 z-10 bg-white dark:bg-slate-900'>
            <div className='flex justify-between items-center px-[1rem] '>
             <button onClick={submitHandler} className='text-white bg-[#ff8400] px-[1rem] py-2 rounded-[.5rem]  w-fit'>Saved to Draft</button> 
  {/* <div role="status">
    <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
</div> */}
            <button onClick={publishHandler} className='text-white bg-[#8034eb] px-[1rem] py-2 rounded-[.5rem]'>publish</button>
            </div>
            </div>
            <form className='h-full'>
            <input  ref={titleRef} defaultValue={blog.title}  type="text" placeholder='Title' className='dark:bg-gray-600 dark:text-white text-[2rem] focus:border-2 focus:border-solid border-none w-full my-5 rounded p-2 focus:border-[#8034eb] outline-none'/>
          <div class="flex justify-center items-center w-full relative ">
          {preview && imgFile?
             <button onClick={closePreview}  className='mr-4 h-14 w-14 flex items-center justify-center rounded-full bg-[rgba(0,0,0,0.4)] absolute left-[2%] top-[10%]'><FaTimes className='text-[1.5rem] fill-white '/></button>
             :""
            }
            <label for="dropzone-file" className="flex flex-col justify-center items-center w-full md:h-[18rem] h-[23rem] bg-gray-50 rounded-lg border-2 border-[#8034eb] border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div class="flex flex-col h-full w-full justify-center items-center ">
              {preview || blog.imageURL ?   
              <img src={preview?preview:blog.imageURL} alt="" className=' h-full w-full' />
              :
              <Fragment>
              <svg aria-hidden="true" className=" hidden mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
               <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
               <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> 
              </Fragment>
              }
           </div>
           <input   id="dropzone-file" type="file" onChange={getFile} className="hidden" />
          </label>
         </div>
         <div className='w-full my-[1rem]'>
           {/* <textarea ref={contentRef} defaultValue={blog.content} cols="30" rows="10" placeholder='Write a story' className=' dark:bg-gray-600 dark:text-white w-full h-full  border-2 focus:border-solid border-none p-3 rounded focus:border-[#8034eb] outline-none '/>  */}
           <ReactQuill 
           className=' dark:bg-slate-900 dark:text-white w-full h-full  border-2 focus:border-solid border-none p-3 rounded focus:border-[#8034eb] outline-none '
           modules={modules}
           theme="snow"
           defaultValue={blog.content}
           onChange={setValue} 
             />;
         </div>     
        </form>
          </div>
        </div>
      </Section>
      }
    </Main>
  );
}
















