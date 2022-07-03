
import {signOut,createUserWithEmailAndPassword, updateProfile, onAuthStateChanged} from 'firebase/auth';
import { doc, getDocs, getDoc,collection, updateDoc } from 'firebase/firestore';
import { auth, createtUserProfileDocument, db } from "../../firebaseConfig";



export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";
export const USER_LOGOUT = "USER_LOGOUT";

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS =  "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";


export const USER_PROFILE_REQUEST = "USER_PROFILE_REQUEST";
export const USER_PROFILE_SUCCESS = "USER_PROFILE_SUCCESS";
export const USER_PROFILE_FAIL = "USER_PROFILE_FAIL";

export const USER_UPDATE_REQUEST = "USER_UPDATE_REQUEST";
export const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS";
export const USER_UPDATE_FAIL = "USER_UPDATE_FAIL";
export const USER_UPDATE_RESET = "USER_UPDATE_RESET"






export const loginUser = (user)=>(dispatch)=>{
    try{        
     dispatch({type:USER_LOGIN_REQUEST})      
      

     dispatch({
        type:USER_LOGIN_SUCCESS,
        payload:user,
     })

  
    }

    catch(error){
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response && error.response.data.detail ?
            error.response.data.detail:error.message
        })
    }

}

export const logOutUser = ()=>(dispatch)=>{
    localStorage.removeItem('userInfo')
    try{
      dispatch({type:USER_LOGOUT}) 
    }
    catch(error){
      
    }

}

export const registerUser = (data)=>async(dispatch)=>{
    try{
     dispatch({type:REGISTER_USER_REQUEST}) 
     const {displayName,email,password} = data
     
     const {user } = await createUserWithEmailAndPassword(auth,email,password)
                  await createtUserProfileDocument(user,{displayName})
                  await updateProfile(user,{displayName})
     dispatch({
        type:REGISTER_USER_SUCCESS,
        payload:user,
     })

    }

    catch(error){
        dispatch({
            type:REGISTER_USER_FAIL,
            payload:error.response && error.response.data.detail ?
            error.response.data.detail:error.message
        })
    }

}

export const getUserProfile = (id)=>async(dispatch)=>{
    try{
        dispatch({type:USER_PROFILE_REQUEST})
        const userProfileRef = doc(db,"users",id)
        const snapshot = await getDoc(userProfileRef)
        const userProfile ={id:snapshot.id,...snapshot.data()}

        dispatch({
            type:USER_PROFILE_SUCCESS,
            payload:userProfile,
        })

    }
    catch(error){
        dispatch({
            type:USER_PROFILE_FAIL,
            payload:error.response && error.response.data.detail ?
            error.response.data.detail:error.message
        })

    }

}

export const updateUserProfile = (data,id)=>async(dispatch)=>{

    try{
        dispatch({type:USER_UPDATE_REQUEST})
        const userRef = doc(db,'users',id)
        const {displayName,email,photoURL}=data
        await updateProfile(auth.currentUser,{
            displayName,
            email,
            photoURL,
        })
        const updatedUser =  await updateDoc(userRef,data)
      dispatch({
        type:USER_UPDATE_SUCCESS,
        payload:updatedUser
      })
    }

    catch(error){
        dispatch({
            type:USER_UPDATE_FAIL,
            payload:error.response && error.response.data.detail ?
            error.response.data.detail:error.message
        })
    }
}