import React,{ useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { DraftBlog } from '../components/DraftBlog';
import { Main } from '../components/Main'
import { Section } from '../components/Section';
import { TabSlide } from '../components/TabSlide';
import { useSelector , useDispatch } from 'react-redux';
import {getAllPosts, createNewPost,POST_CREATE_RESET } from '../store/posts/actions';




export const DraftPage = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const postCreate = useSelector(state =>state.postCreate)
   const {loading:createLoading,success:createSuccess,error:createError,post:createdPost } = postCreate
   const postList = useSelector(state => state.postList)
   const { loading:allPostsLoading, success:allPostsSuccess, error:allPostsError, posts:allPosts } = postList

  useEffect(()=>{
    if(createSuccess){
           navigate(`/posts/${createdPost.id}/edit`)
     }
     dispatch({type:POST_CREATE_RESET})
    dispatch(getAllPosts());
       
  },[createSuccess,navigate,createdPost,dispatch]);
  
    // useEffect(() => {
    
    // },[dispatch]);
 
    console.log({allPosts})

  const writePost = ()=>{
     dispatch(createNewPost())
  }
  
  return (
    <Main>
       <Section>
        <div className='px-[25rem]'>
            <div className="flex mb-[2rem] items-center justify-between w-full">
              <h2 className='text-[4rem] font-bold '>Your Posts</h2>
              <div>
               <button onClick={writePost} className='border-2 px-[2rem] py-[1rem] text-[1.5rem] rounded-[.5rem] text-white bg-[#8034eb]'>Write a post</button>
              </div>
            </div> 
            <div className='w-full mb-[2rem] '>
             <TabSlide current='draft'/>
           </div>
           {allPostsSuccess && allPosts.length >0 &&
           <div className='w-full mb-[2rem] '>
            {allPosts.map((post,index)=>(
             <DraftBlog key={post.id} blog={post} />
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
