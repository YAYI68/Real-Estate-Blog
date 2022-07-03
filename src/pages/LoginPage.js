import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../store/users/actions';
import { Link, useNavigate } from "react-router-dom"
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';






export const LoginPage = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const userLogin = useSelector(state=>state.userLogin)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading,userInfo,success,error} = userLogin

  
  
   
    
    useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
        if(user){ 
          navigate("/") 
        }
      })       
    },[])


    const submitHandler = async(e) => {
        e.preventDefault();
      const {user} = await signInWithEmailAndPassword(auth,email,password) 
      localStorage.setItem('userInfo',JSON.stringify(user))     
        setEmail("")
        setPassword("")
    }
  return (
    <div style={{marginTop:'2rem'}}>
       <form  onSubmit={submitHandler}>
        <div>
         <input type="email"  placeholder="Email"  onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div>
         <input type="password" placeholder="Password"  onChange={(e)=>setPassword(e.target.value)}/>
        </div>
         <button >Login</button>
       </form>
       <Link to="/register">Register</Link>
    </div>
  )
}
