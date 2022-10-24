import React, { Fragment, useEffect, useState } from 'react';
import { Main } from '../components/Main';
import { Section } from '../components/Section';
import { FaFacebookF,FaTwitter,FaInstagram,FaLinkedinIn, FaComment} from 'react-icons/fa';
import { Link,useLocation,useParams } from "react-router-dom";
import { blogPost } from '../data/dummy';
import { getPost } from '../store/posts/actions';
import { useDispatch, useSelector } from 'react-redux';


export const BlogDetail = () => {
  const dispatch = useDispatch();
  const postDetail =  useSelector((state)=>state.postDetail);
  const { success, error , blog, loading, } = postDetail;
  const location = useLocation();
  const {id} =  location.state

   useEffect(()=>{
     dispatch(getPost(id))
   },[id,dispatch])


  return (
    <Main>
      {success && 
      <Fragment >
      <Section className={`flex gap-2`}>
        <aside className='w-[20%] relative mt-[5rem] mx-auto'>
         <div className='bg-white absolute top-[10%] w-[90%] shadow-lg rounded p-5'>
          <div className='w-full h-full flex flex-col items-center text-gray-600'>
            <div className='w-[20rem] h-[20rem] my-2 rounded-full border-2 hover:border-4 hover:shadow-md cursor-pointer border-[#ff8400]'>
              <img src={blog.author.photoURL} alt="profile" className='rounded-full' />
            </div>
            <div className='text-[1.6rem] my-[1rem] flex flex-col items-center'>
            <Link to="/profile" className='text-center text-[#8034eb]'>{blog.author.displayName}</Link>
            <p>{blog.author.headLine}</p>
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
        <article className=' w-[50%] flex flex-col mt-[5rem]'>
          <div className=' w-full flex flex-col  rounded px-2 py-10'>
          <div id='blogTitle' className='w-full'>
            <h2 className='text-[4rem]   font-bold my-[2rem]'>{blog.title}</h2>
          </div>
          <div id='blogImg' className='h-[45rem] w-full mt-[1rem]'>
             <img src={blog.imageURL} alt="" className='w-full h-full' />
          </div>
          <div id="blogContent" className='w-full mt-[2rem] '>
            <p className='text-[1.8rem] leading-[4rem] text-gray-500 whitespace-pre-line .text-margin-start .text-margin-end .text-inline-start .text-inline-end '>
            {blog.content}
            </p>
          </div>
          <div className=' w-full flex justify-end'>
          <button className='h-[3rem] w-[3rem] '><FaComment className='w-[80%] h-[80%] flex items-center ' /></button>
          <p className='text-[1.8rem] text-gray-600  font-medium '>
           12
          </p>
          </div>
          </div>
          <div className=' w-full mt-[2rem]'>
           <div className='mx-auto my-[2rem] bg-white p-5'>
            <div className='flex items-center'>
               <p className='text-[1.4rem] text-[#8034eb] mr-[2rem] font-bold'>Yayi</p>
               <p className='text-[1rem]' >July 17,2020</p>
            </div>
            <p className='text-[1.5rem] mt-1'>Nice Write up</p>
           </div>
           <div className='mx-auto my-[2rem] bg-white p-5'>
            <div className='flex items-center'>
               <p className='text-[1.4rem] text-[#8034eb] mr-[2rem] font-bold'>Biodun</p>
               <p className='text-[1rem]' >July 17,2020</p>
            </div>
            <p className='text-[1.5rem] mt-1'>Nice Write up</p>
           </div>
           <div className=' w-full mt-[2rem]'>
          <form className='flex flex-col mx-auto'>
            <input type="text"  className='w-full text-[1.5rem] h-[3rem] rounded outline-none border-2 p-2 border-[#8034eb]' placeholder='Name' />
            <textarea cols="30" rows="10"  placeholder='Comment' className='rounded p-2 w-full text-[1.5rem] mt-[1rem] outline-none border-2 border-[#8034eb]'  />
            <button className='w-full bg-[#8034eb] text-[1.5rem] mt-2 py-2 rounded text-[white]'>Comment</button>
          </form>
        </div>
        </div>

        </article>
        <aside className='w-[25%] mt-[5rem] relative'>
          <div className='w-[90%] p-2 border-2 shadow-md absolute top-[10%] bg-white dark:bg-black'>
            <p className='text-[2rem] font-medium text-center'>Latest Blogs</p>
            <div className='w-full flex flex-col gap-5 '>
              <div className='my-1 w-full flex flex-col gap-2'>
                 <small className='text-[1.2rem] text-gray-500'>Oct,24,2022</small>
                 <Link to={``}  className='font-semibold text-gray-800 text-[1.5rem] hover:text-[#8034eb] hover:underline'>15 Useful Custom React Hooks for Your Next Web App</Link>
              </div>
              <div className='my-1 w-full flex flex-col gap-2'>
                 <small className='text-[1.2rem] text-gray-500 '>Oct,24,2022</small>
                 <Link to={``} className='font-semibold text-[1.5rem] text-gray-800 hover:text-[#8034eb] hover:underline'>15 Useful Custom React Hooks for Your Next Web App</Link>
              </div>
              <div className='my-1 w-full flex flex-col gap-2'>
                 <small className='text-[1.2rem] text-gray-500'>Oct,24,2022</small>
                 <Link to={``} className='font-semibold text-[1.5rem] text-gray-800 hover:text-[#8034eb] hover:underline'>15 Useful Custom React Hooks for Your Next Web App</Link>
              </div>
            </div>
          </div>
        </aside>  
      </Section>
      </Fragment>
      }
  

     
    </Main>
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
