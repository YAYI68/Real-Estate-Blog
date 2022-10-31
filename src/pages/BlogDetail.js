import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Main } from '../components/Main';
import { Section } from '../components/Section';
import { FaFacebookF,FaTwitter,FaInstagram,FaLinkedinIn, FaComment} from 'react-icons/fa';
import { Link,useLocation,useParams } from "react-router-dom";
import { getPost } from '../store/posts/actions';
import { useDispatch, useSelector } from 'react-redux';
import { BLOG_COMMENT_CREATE_RESET, createBlogComment } from '../store/comments/actions';
import { convertTimeToDate} from '../utils/blog_util';
import { Timestamp } from 'firebase/firestore';
import { Comment } from '../components/Comment';
import { CommentForm } from '../components/CommentForm';
import { RelatedBlog } from '../components/RelatedBlog';
import { Footer } from '../components/Footer';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';



export const BlogDetail = () => {

  const dispatch = useDispatch();
  const postDetail =  useSelector((state)=>state.postDetail);
  const { success:blogSucess, error , blog, loading,comments } = postDetail;
  const createComment = useSelector((state)=>state.createComment)
  const {loading:commentLoading,success:commentSuccess, error:commentError  } = createComment;
  const location = useLocation();
  const {id} =  location.state
   
   useEffect(()=>{
     dispatch(getPost(id))
     dispatch({type:BLOG_COMMENT_CREATE_RESET})
   },[id,dispatch])

  return (
    <Fragment>
    <Main>
      {blogSucess && 
      <Fragment >
      <Section className={`flex gap-2 lg:justify-center mt-[5rem] dark:bg-black dark:text-white`}>
        <aside className='w-[20%] relative mt-[5rem] mx-auto lg:hidden px-4'>
         <div className='bg-white dark:bg-gray-800 dark:text-white absolute top-[10%] w-full shadow-lg rounded p-5'>
          <div className='w-full h-full flex flex-col items-center text-gray-600'>
            <div className='w-[20rem] h-[20rem] xl:h-[15rem] xl:w-[15rem] my-2 rounded-full border-2 hover:border-4 hover:shadow-md cursor-pointer border-[#ff8400]'>
              <img src={blog.author.photoURL} alt="profile" className='rounded-full' />
            </div>
            <div className='text-[1.6rem] my-[1rem] flex flex-col items-center'>
            <Link to="/profile" className='text-center text-[#8034eb]'>{blog.author.displayName}</Link>
            <p className='dark:text-gray-100'>{blog.author.headLine}</p>
            </div>
            <div className='w-[50%] mx-auto flex items-center justify-between my-[1rem]'>
                <button onClick={()=>window.open(blog.author.facebook,'_blank')} className="h-full"><FaFacebookF  className='h-full text-[1.8rem] fill-[#8034eb]'/></button>
                <button onClick={()=>window.open(blog.author.twitter,'_blank')} className="h-full"><FaTwitter className='h-full text-[1.8rem] fill-[#8034eb]' /></button>
                <button onClick={()=>window.open(blog.author.instagram,'_blank')} className="h-full"><FaInstagram className='h-full text-[1.8rem] fill-[#8034eb]'/></button>
                <button onClick={()=>window.open(blog.author.linkedIn,'_blank')} className="h-full"><FaLinkedinIn className='h-full text-[1.8rem] fill-[#8034eb]'/></button>
            </div>
          </div>    
         </div>
        </aside>
        <article className=' w-[50%] flex flex-col mt-[4rem] lg:mt-[2rem] lg:w-[75%] md:w-[90%]'>
          <div className=' w-full flex flex-col  rounded px-2 py-10'>
          <div id='blogTitle' className='w-full'>
            <h2 className='text-[4rem]   font-bold my-[2rem] lg:text-[3rem] sm:text-[2.5rem]'>{blog.title}</h2>
          </div>
          <div id='blogImg' className='h-[45rem] md:h-[35rem] w-full mt-[1rem]'>
             <img src={blog.imageURL} alt="" className='w-full h-full' />
          </div>
          <div id="blogContent" className='w-full mt-[2rem] '>
            <ReactQuill value={blog.content} readOnly={true}
              theme={"bubble"}   
              /> 
           
            {/* <div dangerouslySetInnerHTML={{__html:blog.content}} className='text-[1.8rem] lg:text-[1.5rem] leading-[4rem] text-gray-700 dark:text-gray-200 whitespace-pre-line .text-margin-start .text-margin-end .text-inline-start .text-inline-end ' /> */}
          </div>
          <div className=' w-full flex justify-end p-2'>
          <button className='h-[3rem] w-[3rem] '><FaComment className='w-[80%] h-[80%] flex items-center ' /></button>
          <p className='text-[1.8rem]  font-medium text-[#8034eb]'>
           {comments.length}
          </p>
          </div>
          </div>
          <div className=' w-full mt-[2rem]'>
            {comments? 
            comments.map((comment,index)=>(
            <Comment key={index} comment={comment} />
            )):
            <p>No Comment yet</p>
          }
           <div className=' w-full mt-[2rem]'>
             <CommentForm blogId={id} />
            </div>
        </div>

        </article>
        <aside className='w-[25%] mt-[5rem] relative lg:hidden px-2'>
         {/* <RelatedBlog /> */}
        </aside>  
      </Section>
      </Fragment>
      }
    </Main>
    <Footer /> 
    </Fragment>
  )
}



































// import React,{useEffect} from 'react';
// import { useDispatch, useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'
// import { getPost } from '../store/posts/actions'
// import { Link } from "react-router-dom"
// import { Main } from '../components/Main';




// export const BlogDetail = () => {
//   const params = useParams()
//   const dispatch = useDispatch()
//   const postDetail = useSelector(state => state.postDetail)
//   const { loading,success,error,post } = postDetail
//   const id = params.id

//   console.log("id",id)
//   console.log("post",post)

// useEffect(()=>{
//   dispatch(getPost(id))
// },[])


// return (
//   <div>
//     <div>
//       {success && 
//       <div key={post.id}>
//           <h2>{post.title}</h2>
//           <p>{post.content}</p>
//           <Link to={`/blog/${post.id}/edit`}>EditPost</Link>
//       </div>
//       }
    
//     </div>
//   </div>
// )
// }
