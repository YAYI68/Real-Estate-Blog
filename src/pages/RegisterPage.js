// import { createUserWithEmailAndPassword, updateProfile, } from 'firebase/auth';
// import { ref,uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import React,{useEffect, useState} from 'react';
// import { auth, createtUserProfileDocument, storage } from '../firebaseConfig';
import { registerUser } from '../store/users/actions';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


export const RegisterPage = () => {
  const [displayName,setDisplayName ] = useState();
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const userRegister = useSelector(state =>state.userRegister)
  const { userInfo } = userRegister
  const dispatch = useDispatch()
  // const [file,setFile] = useState('')
  // const [photoURL,setPhotoURL] = useState('')
  // const storageRef = ref(storage,`images/${file.name}`)


  useEffect(()=>{
  
  },[])
   
  const data = {
    displayName,
    email,
    password,
  }
 

  const submitHandler = async (e)=>{
      e.preventDefault();
      dispatch(registerUser(data))
  }

  return (
    <div style={{marginTop:'3rem'}}>
      <form  onSubmit={submitHandler}>
        <div>
           <input type="text"  placeholder="displayName"  onChange={(e)=>setDisplayName(e.target.value)}/>
        </div>
        <div>
           <input type="email" placeholder="Email"  onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div>
           <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <button>Register</button>   
      </form>
      <Link to="/login">login</Link>
    </div>
  )
}
