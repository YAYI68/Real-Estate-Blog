import React,{Fragment, useEffect, useState} from 'react'
import { Main } from '../components/Main'


import { EditProfile } from '../components/EditProfile';
import { Profile } from '../components/Profile';
import { auth, db } from '../firebaseConfig';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useStateContext } from '../context/ContextProvider';
import { Footer } from '../components/Footer';






export const UserProfile = () => {
  const [editProfile,setEditProfile] = useState(false)
  const [ isLoading , setIsLoading] = useState(true)
  const [userData, setUserData] = useState()
  const { userInfo, authorId } = useStateContext();
  const userId = auth.currentUser ?auth.currentUser.uid : authorId

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
    <Fragment>

    { userData ? 
    <Fragment >     
      <Main>
      <Profile  user={userData} setEditProfile={setEditProfile} />
     {editProfile &&   
     <EditProfile user={userData} setEditProfile={setEditProfile}/>
     }
     </Main>
     <Footer /> 
    </Fragment>
    :""
    }
    </Fragment>
  )
}

