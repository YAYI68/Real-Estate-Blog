
import React, { useRef } from 'react';
import { Timestamp } from 'firebase/firestore'
import { useDispatch } from 'react-redux';
import { createBlogComment } from '../store/comments/actions';



export const CommentForm = ({blogId}) => {
    const commentNameRef =   useRef(null)
    const commentContentRef = useRef(null)
    const dispatch = useDispatch();


    const handleSubmit = (e)=>{
        e.preventDefault();
        const  commentName = commentNameRef.current.value;
        const commentContent = commentContentRef.current.value;
        const data = {
         blogId:blogId,
         commentName,
         commentContent,
         commentDate:Timestamp.fromDate(new Date()),
        }
        dispatch(createBlogComment(data))
      }
  return (
    <form className='flex flex-col mx-auto' onSubmit={handleSubmit}>
    <input  ref={commentNameRef} type="text"  className='dark:bg-slate-800 dark:text-gray-200 w-full text-[1.5rem] h-[3rem] rounded outline-none focus:border-2 p-2 focus:border-[#8034eb]' placeholder='Name' />
    <textarea ref={commentContentRef} cols="30" rows="10"  placeholder='Comment' className=' dark:bg-slate-800 dark:text-gray-200rounded w-full text-[1.5rem] mt-[1rem] outline-none focus:border-2 p-2 focus:border-[#8034eb]'  />
    <button className='w-full bg-[#8034eb] text-[1.5rem] mt-2 py-2 rounded text-[white]'>Comment</button>
  </form>
  )
}
