import { addDoc, collection} from "firebase/firestore"
import { db } from "../../firebaseConfig"

export const BLOG_COMMENT_LIST_REQUEST = "BLOG_COMMENT_LIST_REQUEST"
export const BLOG_COMMENT_LIST_SUCCESS = "BLOG_COMMENT_LIST_SUCCESS"
export const BLOG_COMMENT_LIST_FAIL = "BLOG_COMMENT_LIST_FAIL"

export const BLOG_COMMENT_CREATE_REQUEST = "BLOG_COMMENT_CREATE_REQUEST"
export const BLOG_COMMENT_CREATE_SUCCESS = "BLOG_COMMENT_CREATE_SUCCESS"
export const BLOG_COMMENT_CREATE_FAIL = "BLOG_COMMENT_CREATE_FAIL"

export const BLOG_COMMENT_DELETE_REQUEST = "BLOG_COMMENT_DELETE_REQUEST"
export const BLOG_COMMENT_DELETE_SUCCESS = "BLOG_COMMENT_DELETE_SUCCESS"
export const BLOG_COMMENT_DELETE_FAIL = "BLOG_COMMENT_DELETE_FAIL"



export const createBlogComment = (data)=>async(dispatch)=>{
    try{
        dispatch({type:BLOG_COMMENT_CREATE_REQUEST})
       const commentRef = collection(db,'comments')
        const commentSnapshot =  await addDoc(commentRef,data)
       const comment = {id:commentSnapshot.id} 
       dispatch({
        type:BLOG_COMMENT_CREATE_SUCCESS,
        payload:comment,
       })
    }
    catch(error){
       dispatch({
           type:BLOG_COMMENT_CREATE_FAIL,
           payload:error.response && error.response.data.detail ?
           error.response.data.detail:error.message
       })
    }

}

