
import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth, storage } from '../firebaseConfig';
import { getUserProfile } from '../store/users/actions';
import { ref, uploadBytesResumable,getDownloadURL  } from "firebase/storage";
import {useParams} from "react-router-dom"
import { updateNewPost } from '../store/posts/actions';



export const CreatePost = () => {
  const dispatch = useDispatch()
    const [ title, setTitle ] = useState("")
    const [ content, setContent] = useState("")
    const [file,setFile]= useState("")
    const [ postImage, setPostImage ] =useState("")
    const [ blogState,setBlogState ] = useState("")
    const userProfile = useSelector(state =>state.userProfile)
    const postDetail = useSelector(state => state.postDetail)
  const { loading:detailLoading,success:detailSuccess,error:detailError,post:detailPost } = postDetail
    const {profile} = userProfile
    const userLogin = useSelector(state=>state.userLogin)
    const { userInfo } = userLogin
    const userId = userInfo.uid
    const params = useParams()
    const postId = params.id
    
    const slug = title?title.replaceAll(" ","-"):""

    useEffect(() => {
       dispatch(getUserProfile(userId))
       if(detailSuccess){
         if(detailPost.id === postId){
          setTitle(detailPost.title) 
          setContent(detailPost.content)
          setPostImage(detailPost.postImage)
          setBlogState(detailPost.blogState)
         }
       }else{
         dispatch(getPost(postId))
        }
       
    },[])
    const publishAt = blogState === "publish"? new Date() : ""

    const {displayName,email,photoURL,twitter,instagram,linkedin } = profile

    const newPost = {
        title,
        content,
        blogState,
        postImage,
        publishAt,
        slug,
        author:{
            displayName,
            email,
            photoURL,
            twitter,
            instagram,
            linkedin
        }
    }

    const uploadHandler = ()=>{
      const storageRef = ref(storage,`post/images/${}/${file.name}`)
    }


    const submitHandler = (e)=>{
       e.preventDefault();
       dispatch(updateNewPost(postId,newPost))
    }
    



  return (
    <div style={{marginTop:"4rem"}}>
         <img src={postImage} alt=""  />
         <button>Upload</button>
        <form>
            <div>
              <input type="text" placeholder="Title"  value={title}  onChange={(e)=>setTitle(e.target.value)} />
            </div>
            <div>
              <textarea cols="30" rows="10"  placeholder="content" value={content}  onChange={(e)=>setContent(e.target.value)}/>
            </div>
            <input type="file"  onChange={(e)=>setFile(e.target.files[0])}/>
        </form>
    </div>
  )
}
