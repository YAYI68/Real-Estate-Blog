
import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth, storage } from '../firebaseConfig';
import { getUserProfile } from '../store/users/actions';
import { ref, uploadBytesResumable,getDownloadURL  } from "firebase/storage";
import {useParams} from "react-router-dom"
import { getPost, updateNewPost } from '../store/posts/actions';
import { useNavigate } from "react-router-dom";



export const CreatePost = () => {
  const dispatch = useDispatch()
  const [authorProfile,setAuthorProfile] = useState({})
    const [ title, setTitle ] = useState("")
    const [ content, setContent] = useState("")
    const [file,setFile]= useState("")
    const [ postImage, setPostImage ] =useState("")
    const [ blogState,setBlogState ] = useState("")
    const navigate = useNavigate()
    const userProfile = useSelector(state =>state.userProfile)
    const postDetail = useSelector(state => state.postDetail)
  const { loading:detailLoading,success:detailSuccess,error:detailError,post:detailPost } = postDetail
    const {profile,success:successProfile} = userProfile
    const userLogin = useSelector(state=>state.userLogin)
    const { userInfo } = userLogin
    const userId = userInfo.uid
    const params = useParams()
    const postId = params.id
    const slug = title?title.replaceAll(" ","-"):""
    
    // console.log("detailPost",detailPost.id) 
    // console.log("postId",postId) 

    useEffect(() => {
      if(!userInfo){
        navigate("/")
      }
      if(!detailPost.title || detailPost.id !== postId){
        dispatch(getPost(postId))
      }         
      else{
          setTitle(detailPost.title) 
          setContent(detailPost.content)
          setPostImage(detailPost.postImage)
          setBlogState(detailPost.blogState)
          const {displayName,email,photoURL,twitter,instagram,linkedin } = profile
          setAuthorProfile({
            displayName,
            email,
            photoURL,
            twitter,
            instagram,
            linkedin
          })
         }
         dispatch(getUserProfile(userId))
    },[detailSuccess])
    const publishAt = blogState === "publish"? new Date() : ""

    

    const newPost = {
        title,
        content,
        blogState,
        postImage,
        publishAt,
        slug,
        author:{
          ...authorProfile, 
        }
    }

    const uploadHandler = ()=>{
      const storageRef = ref(storage,`/images/blog/${postId}/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef,file)
      uploadTask.on("state_changed",(snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error)=>{
        
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setPostImage(downloadURL)
        });
      } 
      )

    }


    const submitHandler = (e)=>{
       e.preventDefault();
       dispatch(updateNewPost(postId,newPost))
       console.log("blog saved to draft")
    }
    
const publishHandler = ()=>{
  setBlogState("publish")
  dispatch(updateNewPost(postId,newPost))
}


  return (
    <div style={{marginTop:"4rem"}}>
      {detailSuccess && successProfile &&         
      <div>
         <img src={postImage} alt=""  />
         <button onClick={uploadHandler}>Upload</button>
         <form onSubmit={submitHandler} style={{marginTop:"4rem"}}>
            <div>
              <input type="text" placeholder="Title"  value={title}  onChange={(e)=>setTitle(e.target.value)} />
            </div>
            <div>
              <textarea cols="30" rows="10"  placeholder="content" value={content}  onChange={(e)=>setContent(e.target.value)}/>
            </div>
            <input type="file"  onChange={(e)=>setFile(e.target.files[0])}/>
            <button>Draft</button>
          </form>
      </div>
      }
        <button onClick={publishHandler}>publish</button>
    </div>
  )
}
