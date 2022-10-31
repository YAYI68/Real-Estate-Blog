import { auth, db } from "../../firebaseConfig";
import { collection,getDocs,getDoc, doc, addDoc, updateDoc, where, query, limit, Timestamp, deleteDoc } from "firebase/firestore";






export const POST_LIST_REQUEST = "POST_LIST_REQUEST";
export const POST_LIST_SUCCESS = "POST_LIST_SUCCESS";
export const POST_LIST_FAIL = "POST_LIST_FAIL";

export const POST_LIST_PUBLISH_REQUEST = "POST_LIST_PUBLISH_REQUEST";
export const POST_LIST_PUBLISH_SUCCESS = "POST_LIST_PUBLISH_SUCCESS";
export const POST_LIST_PUBLISH_FAIL =" POST_LIST_PUBLISH_FAIL"

export const POST_DETAIL_REQUEST = "POST_DETAIL_REQUEST";
export const POST_DETAIL_SUCCESS = "POST_DETAIL_SUCCESS";
export const POST_DETAIL_FAIL = "POST_DETAIL_REQUEST";


export const POST_CREATE_REQUEST = "POST_CREATE_REQUEST";
export const POST_CREATE_SUCCESS = "POST_CREATE_SUCCESS";
export const POST_CREATE_FAIL = "POST_CREATE_FAIL"
export const POST_CREATE_RESET = "POST_CREATE_RESET"

export const POST_UPDATE_REQUEST = "POST_UPDATE_REQUEST";
export const POST_UPDATE_SUCCESS = "POST_UPDATE_SUCCESS";
export const POST_UPDATE_FAIL = "POST_UPDATE_FAIL";

export const POST_DELETE_REQUEST = "POST_DELETE_REQUEST";
export const POST_DELETE_SUCCESS = "POST_DELETE_SUCCESS";
export const POST_DELETE_FAIL = "POST_DELETE_FAIL";



export const  getAllPublishPosts =(num)=>async(dispatch)=>{      
    try{
       dispatch({type:POST_LIST_PUBLISH_REQUEST})
       const postRef = collection(db, "posts");
       const q = query(postRef, where("blogState", "==", "publish"), limit(num));
       const snapshots = await getDocs(q)
       const posts = snapshots.docs.map(snapshot=>({id:snapshot.id,...snapshot.data()}))

       dispatch({
        type:POST_LIST_PUBLISH_SUCCESS,
        payload:posts
       })
    }
    catch(error){
        dispatch({
            type:POST_LIST_PUBLISH_FAIL,
            payload:error.message
        })
    }
    
}


export const  getAllPosts =(state)=>async(dispatch)=>{      
    try{
       dispatch({type:POST_LIST_REQUEST})
       const postRef = collection(db, "posts");
       const q = query(postRef, where("blogState", "==", `${state}`));
       const snapshots = await getDocs(q)
       const posts = snapshots.docs.map(snapshot=>({id:snapshot.id,...snapshot.data()}))
       const counts = posts.length
       dispatch({
        type:POST_LIST_SUCCESS,
        payload:{
            posts,
            counts,
        }
       })
    }
    catch(error){
        dispatch({
            type:POST_LIST_FAIL,
            payload:error.message
        })
    }
    
}





export const getPost = (id)=>async (dispatch)=>{
    try{
        dispatch({type:POST_DETAIL_REQUEST})
         
        const getPost = async()=>{
            const postRef = doc(db,'posts',`${id}`)
            const blogshot = await getDoc(postRef)
            const post = {id:blogshot.id,...blogshot.data()}
            return post
        }

        const getComments = async()=>{
            const commentsRef = collection(db,'comments')
            const q = query(commentsRef,where("blogId", "==", id))
            const commentShots = await getDocs(q)
            const comments = commentShots.docs.map((doc)=>({commentId:doc.id,...doc.data()}))
            return comments      
       }
       const [post, comments] = await Promise.all([getPost(), getComments()])

        dispatch({
            type:POST_DETAIL_SUCCESS,
            payload:{
                post,
                comments,
            }
        })
        
    }
    catch(error){
        dispatch({
            type:POST_DETAIL_FAIL,
            payload:error.response && error.response.data.detail ?
            error.response.data.detail:error.message
        })

    }

}

export const createNewPost = ()=>async(dispatch,getState)=>{
     try{
        dispatch({type:POST_CREATE_REQUEST})        
          const 
          {userLogin:{userInfo}
            }=getState()
          const userRef =  doc(db,'users',`${userInfo.uid}`)
          const snapshot = await getDoc(userRef)
          const author = {id:snapshot.id,...snapshot.data()}
          const newPost = {
            title:"Write your blog title",
            excerpts:"",
            content:" Write a Story",
            createdAt:Timestamp.fromDate(new Date()),
            blogState:"draft",
            imageURL:"",
            publishAt:"",
            slug:"",
            author:{
              ...author
            }
        }

        const postRef = collection(db, "posts")
         const postSnapshot =  await addDoc(postRef,newPost)
        const post = {id:postSnapshot.id} 
        dispatch({
            type:POST_CREATE_SUCCESS,
            payload:post,
        })
     }
     catch(error){
        dispatch({
            type:POST_CREATE_FAIL,
            payload:error.response && error.response.data.detail ?
            error.response.data.detail:error.message
        })
     }

}



export const updateNewPost = (id,data)=>async(dispatch)=>{
    try{
        dispatch({type:POST_UPDATE_REQUEST})
       const postRef = doc(db,"posts",`${id}`)  
                 await updateDoc(postRef,data)
        const postSnapshot = await getDoc(postRef)
       const post = {id:postSnapshot.id}   

       dispatch({
           type:POST_UPDATE_SUCCESS,
           payload:post
       })
       
       dispatch({
        type:POST_DETAIL_SUCCESS,
        payload:post
    })
    }
    catch(error){
       dispatch({
           type:POST_UPDATE_FAIL,
           payload:error.response && error.response.data.detail ?
           error.response.data.detail:error.message
       })
    }

}


export  const deleteBlog = (id)=>async(dispatch)=>{
    try{
        dispatch({type:POST_DELETE_REQUEST})
        const postRef = doc(db, "posts", `${id}`)
        await deleteDoc(postRef)

        dispatch({
            type:POST_DELETE_SUCCESS,
            payload:"Blog sucessfully deleted",
        })
    }
    catch(error){
      dispatch({
        type: POST_DELETE_FAIL,
        payload:error
      })
    }
}