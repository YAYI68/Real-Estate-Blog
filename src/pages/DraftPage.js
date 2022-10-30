import React,{ useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { DraftBlog } from '../components/DraftBlog';
import { Main } from '../components/Main'
import { Section } from '../components/Section';
import { TabSlide } from '../components/TabSlide';
import { useSelector , useDispatch } from 'react-redux';
import {getAllPosts, createNewPost,POST_CREATE_RESET } from '../store/posts/actions';
import { auth } from '../firebaseConfig';
import { useStateContext } from '../context/ContextProvider';




export const DraftPage = () => {
   const [currentState, setCurrentState] = useState("draft");
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const postCreate = useSelector(state =>state.postCreate)
   const {loading:createLoading,success:createSuccess,error:createError,blog:createdBlog } = postCreate
   const postList = useSelector(state => state.postList)
   const { loading:allPostsLoading, success:allPostsSuccess, error:allPostsError, blogs:allBlogs } = postList

   
  useEffect(()=>{
    if(!auth.currentUser){
      navigate("/login")
    }
    if(createSuccess){
           navigate(`/blogs/${createdBlog.id}/edit`)
     }
     dispatch({type:POST_CREATE_RESET})
    dispatch(getAllPosts(currentState));
       
  },[createSuccess,navigate,createdBlog,dispatch,currentState]);
  
  const writePost = ()=>{
     dispatch(createNewPost())
  }
  
  return (
    <Main>
       <Section className={`flex flex-col dark:bg-black items-center mt-[5rem]`}>
        <div className='flex flex-col w-[50%] lg:w-[80%] md:w-full z-10  '>
           <div className='flex flex-col w-full pt-4 px-4  bg-white dark:bg-slate-900 sticky top-[7rem] md:top-[6.5rem] left-0 z-10'>
           <div className="flex mb-[2rem] md:mt-[1.5rem] items-center justify-between w-full">
              <h2 className='text-[4rem] md:text-[2.5rem] sm:text-[1.5rem] font-bold  dark:text-white'>Your Posts</h2>
              <div>
               <button onClick={writePost} className='border-2 px-[2rem] py-[1rem] text-[1.5rem] sm:text-[1.2rem] sm:font-semibold rounded-[.5rem] text-white bg-[#8034eb]'>Write a post</button>
              </div>
            </div> 
            <div className='w-full  '>
             <TabSlide currentState={currentState} setCurrentState={setCurrentState} />
           </div>
           </div>    
           {allPostsSuccess && allBlogs.length >0 &&
           <div className='w-full mb-[2rem] flex-grow h-full  flex flex-col gap-4 '>
            {allBlogs.map((blog,index)=>(
             <DraftBlog key={blog.id} blog={blog} />
            ))}
             {/* <DraftBlog/> */}
             {/* <div className='w-full mt-[2rem]'>
                <p className='text-center text-[2rem] '>You haven`t write any article yet.</p>
             </div> */}
           </div>
         }
        </div>
       </Section>
      
    </Main>
  )
}
