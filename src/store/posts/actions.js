import { auth, db } from "../../firebaseConfig";
import { collection,getDocs,getDoc, doc, addDoc, updateDoc, setDoc } from "firebase/firestore";




export const POST_LIST_REQUEST = "POST_LIST_REQUEST";
export const POST_LIST_SUCCESS = "POST_LIST_SUCCESS";
export const POST_LIST_FAIL = "POST_LIST_FAIL";

export const POST_DETAIL_REQUEST = "POST_DETAIL_REQUEST";
export const POST_DETAIL_SUCCESS = "POST_DETAIL_SUCCESS";
export const POST_DETAIL_FAIL = "POST_DETAIL_REQUEST";

export const POST_CREATE_REQUEST = "POST_CREATE_REQUEST";
export const POST_CREATE_SUCCESS = "POST_CREATE_SUCCESS";
export const POST_CREATE_FAIL = "POST_CREATE_FAIL"
export const POST_CREATE_RESET = "POST_CREATE_RESET"

export const POST_UPDATE_REQUEST = "POST_UPDATE_REQUEST";
export const POST_UPDATE_SUCCESS = "POST_UPDATE_SUCCESS";
export const POST_UPDATE_FAIL = "POST_UPDATE_FAIL"


export const  allPosts =()=>async(dispatch)=>{      
    try{
       dispatch({type:POST_LIST_REQUEST})
       const snapshots = await getDocs(collection(db,"posts"))
       const posts = snapshots.docs.map(snapshot=>({id:snapshot.id,...snapshot.data()}))
       dispatch({
        type:POST_LIST_SUCCESS,
        payload:posts
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

        const postRef = doc(db,'posts',`${id}`)
        const snapshot = await getDoc(postRef)
        const post = {id:snapshot.id,...snapshot.data()}

        dispatch({
            type:POST_DETAIL_SUCCESS,
            payload:post
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

        // const {
        //     userLogin:{ userInfo },
        // } = getState()
        const newPost = {
            title:"Write your blog title",
            content:" Write a Story",
            createdAt: new Date(),
            blogState:"draft",
            postImageURL:"",
            publishAt:"",
            slug:"",
            authorId:auth.currentUser.uid
        }

        const postRef = collection(db, "posts")
       
         const postSnapshot =  await addDoc(postRef,newPost)
        const post = {id:postSnapshot.id} 

        dispatch({
            type:POST_CREATE_SUCCESS,
            payload:post
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
       const post = {id:postSnapshot.id,...postSnapshot.data()}   

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