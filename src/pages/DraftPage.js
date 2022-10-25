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
   const {loading:createLoading,success:createSuccess,error:createError,blog:createdBlog } = postCreate
   const postList = useSelector(state => state.postList)
   const { loading:allPostsLoading, success:allPostsSuccess, error:allPostsError, blogs:allBlogs } = postList

   console.log({allBlogs})

  useEffect(()=>{
    if(createSuccess){
           navigate(`/blogs/${createdBlog.id}/edit`)
     }
     dispatch({type:POST_CREATE_RESET})
    dispatch(getAllPosts());
       
  },[createSuccess,navigate,createdBlog,dispatch]);
  
    console.log({allBlogs})

  const writePost = ()=>{
     dispatch(createNewPost())
  }
  
  return (
    <Main>
       <Section className={`flex flex-col items-center`}>
        <div className='flex flex-col w-[50%] lg:w-[80%] md:w-full '>
            <div className="flex mb-[2rem] md:mt-[1.5rem] items-center justify-between w-full">
              <h2 className='text-[4rem] md:text-[2.5rem] sm:text-[1.5rem] font-bold '>Your Posts</h2>
              <div>
               <button onClick={writePost} className='border-2 px-[2rem] py-[1rem] text-[1.5rem] sm:text-[1.2rem] sm:font-semibold rounded-[.5rem] text-white bg-[#8034eb]'>Write a post</button>
              </div>
            </div> 
            <div className='w-full mb-[2rem] '>
             <TabSlide current='draft'/>
           </div>
           {allPostsSuccess && allBlogs.length >0 &&
           <div className='w-full mb-[2rem] flex flex-col gap-4'>
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
