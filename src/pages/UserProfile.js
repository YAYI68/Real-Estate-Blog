import React,{useEffect, useState} from 'react'
import { Main } from '../components/Main'


import { EditProfile } from '../components/EditProfile';
import { Profile } from '../components/Profile';
import { auth, db } from '../firebaseConfig';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useStateContext } from '../context/ContextProvider';






export const UserProfile = () => {
  const [editProfile,setEditProfile] = useState(false)
  const [ isLoading , setIsLoading] = useState(true)
  const [userData, setUserData] = useState()
  const { userInfo } = useStateContext();
  const userId = auth.currentUser.uid

  // console.log(userInfo.uid)


 useEffect(() => {    
          const userRef = doc(db, 'users', userId)
          const unsub =  onSnapshot(userRef,(doc)=>{
            setUserData({
              ...doc.data(),
            })
          });
          // console.log({id:userSnap.id})
          setIsLoading(false)
      return ()=>{
        unsub()
      }
 },[userId])

  
 if(isLoading){
  return <h1>Loading...</h1>
 }

  return (
    <>
    { userData && 
     <Main>
     <Profile  user={userData} setEditProfile={setEditProfile} />
    {editProfile &&   
    <EditProfile user={userData} setEditProfile={setEditProfile}/>
    }
    </Main>
    }
    </>
  )
}


















// import React,{useEffect, useState} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { allPosts } from '../store/posts/actions';
// import { getUserProfile, USER_UPDATE_RESET } from '../store/users/actions';





// export const UserProfile = () => {
//     const [name,setName] = useState("")
//     const [email,setEmail] = useState("")
//     const [photoURL,setPhotoURL] = useState("")
//     const [twitter, setTwitter] = useState("")
//     const [instagram,setIntagram] = useState("")
//     const [linkedin,setLinkedin] = useState("")
//     const userLogin = useSelector(state => state.userLogin)
//     const { userInfo } = userLogin
//     const dispatch = useDispatch()
//     const userId = userInfo.uid

//     const postList = useSelector(state =>state.postList)
//     const { posts } = postList
//     // const { author }= posts

//     const userProfile = useSelector(state =>state.userProfile)
//     const {loading,error,success,profile} = userProfile

//     console.log("profile",profile)
//     console.log("user",posts)
    


//  useEffect(()=>{
//    dispatch(getUserProfile(userId))
//    dispatch({type:USER_UPDATE_RESET})
    
//     //  dispatch(allPosts())
//  },[])



//   return (
//     <div>
//       <p>My Profile</p>
//       {success &&     
//         <div>
//         <p>{profile.displayName}</p>
//         <p>{profile.email}</p>
//         <p>{profile.photoURL}</p>
//         <p>twitter</p>
//         <p>instagram</p>
//         <p>linkedin</p>
//         </div>
//       }
//     </div>
//   )
// }
