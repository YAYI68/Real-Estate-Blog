
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../store/users/actions';
import { Link, useNavigate } from "react-router-dom"
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Main } from '../components/Main'
import { Section } from '../components/Section'


export const LoginPage = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const userLogin = useSelector(state=>state.userLogin)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userInfo} = userLogin

    useEffect(()=>{
         onAuthStateChanged(auth,(user)=>{
             if(user){ 
               navigate("/profile") 
             }
         })
        //  if(userInfo){
        //   navigate("/profile") 
        //  }
         
         },[navigate,userInfo])

  
    const submitHandler = async(e) => {
        e.preventDefault();
      const {user} = await signInWithEmailAndPassword(auth,email,password) 
      localStorage.setItem('userInfo',JSON.stringify(user))     
        setEmail("")
        setPassword("")
    }

  return (
    <Main>
      <Section>
         <div className='h-full w-full'>
           <div className='m-auto w-[50%] bg-[white] shadow-md rounded'>
             <form className='w-full p-[5rem] ' onSubmit={submitHandler}>
              <div className='flex-col flex mb-4'>
              <label htmlFor='userEmail' className='text-[1.5rem] mb-[.5rem]'>Email</label>
              <input  onChange={(e)=>setEmail(e.target.value)}  type="email" id='userEmail' placeholder='Email' className='focus:border-[#8034eb] rounded text-[1.5rem] border-2 outline-none p-4' />
              </div>
              <div className='flex-col flex mb-4 '>
              <label htmlFor='userPassword' className='text-[1.5rem] mb-[.5rem]'>Password</label>
              <input  onChange={(e)=>setPassword(e.target.value)} type="password" id='userPassword' placeholder='Password' className='focus:border-[#8034eb] rounded text-[1.5rem] p-4 border-2 outline-none' />
              </div>
              <button className='text-center w-fit bg-[#8034eb] text-[1.5rem] rounded py-2 px-6 mx-auto text-white'>Login</button>
             </form>
           </div>
         </div>
      </Section>
    </Main>
  )
}

