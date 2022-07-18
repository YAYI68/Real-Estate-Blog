import React from 'react'
import {Main} from "../components/Main"
import {Section} from "../components/Section"
import {Carousel} from "../components/Carousel"
import {Blog} from "../components/Blog";


export const HomePage = () => {
  return (
    <Main>
      <Carousel />
      <Blog />
    </Main>
  )
}




// import React,{useEffect,useState} from 'react'
// import { useDispatch,useSelector  } from 'react-redux';
// import { allPosts } from '../store/posts/actions';
// import { Link,useNavigate } from "react-router-dom";
// import { logOutUser } from '../store/users/actions';
// import {createNewPost } from '../store/posts/actions';
// import { auth } from '../firebaseConfig';
// import { onAuthStateChanged, signOut } from 'firebase/auth';





// export const HomePage = () => {
//    const [userInfo,setUserInfo] = useState()
//     const postList = useSelector(state =>state.postList)
//     const postCreate = useSelector(state =>state.postCreate)
//     const { loading, success,posts, error} = postList
//     const {loading:createLoading,success:createSuccess,error:createError,post:createdPost }=postCreate
//     const navigate = useNavigate()
//     const dispatch = useDispatch()   

//     console.log('created',createSuccess)
//     console.log("error",createError)
//     console.log("createdPost",createdPost)

//   useEffect(() => {
//     if(createSuccess){
//       navigate(`/blog/${createdPost.id}/edit`)
//     }
//     dispatch(allPosts())
//     onAuthStateChanged(auth,(user)=>{
//       if(user){ 
//         setUserInfo(user)
//       }
//       else{
//         setUserInfo("")
//       }
//     }) 
//   },[dispatch,createSuccess])
  
//   const signUserOut = async ()=>{
//     await signOut(auth)
//     // dispatch(logOutUser()) 
//     localStorage.removeItem('userInfo') 
//   }

//    const createHandler = ()=>{
//      dispatch(createNewPost())
//    }


//   return (
//     <div>
//         {userInfo? 
//         <button onClick={signUserOut}>Logout</button>:
//         <Link to="/login">login</Link>
//          }
//          {success &&     
//         <div>
//           {posts.map(post =>(
//             <div key={post.id}>
//               <Link to={`/${post.id}`} >{post.title}</Link>
//             </div>
//           ))}
//         </div>
//          }
//             <button onClick={createHandler}>create Post</button>
//     </div>
//   )
// }
