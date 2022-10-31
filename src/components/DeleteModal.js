import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import { deleteBlog, getAllPosts } from '../store/posts/actions';
import { Section } from './Section'

export const DeleteModal = ({setModal,blog}) => {
  const {setAlertMessage,currentState} =   useStateContext()
  const dispatch =  useDispatch()
  const navigate = useNavigate();
  const postDelete = useSelector((state)=>state.postDelete)
  const { success, error, message } = postDelete

  useEffect(()=>{
    if(success){
      navigate("/blogs/draft")
    }
  },[navigate,success,message,setAlertMessage])

const removeBlog = (id)=>{
  dispatch(deleteBlog(id))
}
  return (
    <Section>
    <div  onClick={()=>setModal(false)} className='fixed z-[20]  w-[100vw]  h-[100vh] bg-[rgb(0,0,0,0.69)]  left-0 top-0  flex items-center justify-center'></div>
        <div className='w-[35%]  lg:w-[50%] left-1/2 -translate-x-1/2 rounded-md  top-[20%] bg-white fixed z-[25] md:w-[80%] '>
           <div className='w-full h-full bg-white rounded-md dark:bg-slate-900 flex gap-5 flex-col p-4 justify-between'>
            <h3 className='dark:text-white text-[3rem]  md:text-[2rem] font-semibold lg:text-[2.8rem]'>Are you sure, you want to delete this?</h3>
            <p className='text-[2rem] md:text-[1.8rem] dark:text-gray-200'>{blog.title}</p>
            <div className='flex justify-between'>
              <button onClick={()=>setModal(false)} type="" className='bg-red-500 text-[1.8rem] rounded-md px-3 py-2 text-center text-white'>Cancel</button>
              <button onClick={()=>removeBlog(blog.id)}  type=""  className='bg-blue-700 text-[1.8rem] rounded-md px-3 py-2 text-center text-white'>Confirm</button>
            </div>
           </div> 
        </div>
    </Section>
  )
}
