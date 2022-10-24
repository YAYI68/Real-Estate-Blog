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
      <Section>
        <article className='px-[20rem] w-full mt-[5rem]'>
          <div className=' w-full flex flex-col  rounded px-2 py-10'>
          <div className=' h-[5rem] flex w-full px-[.5rem] justify-between mt-3'>
            <div className='flex h-full basis-[30%] '>
              <div className='basis-[18%] h-full  rounded-full mr-4'>
                <img src={blog.author.photoURL} className='w-full h-full rounded-full' alt="" />
              </div>
              <Link to={'/profile'}><p className='text-[1.5rem] font-bold mr-4 text-[#8034eb]'>{blog.author.displayName}</p></Link> 
              {/* <p className='text-[1.5rem] text-[grey]'>{blog.publishAt?blog.publishAt:""}</p> */}
            </div>
            <div className='basis-[10%]'>
            <div className='w-full h-[40%] flex items-center justify-between'>
                <button  onClick={()=>window.open(blog.author.facebook,'_blank')} className="h-full"><FaFacebookF  className='h-full text-[1rem] fill-[#8034eb]'/></button>
                <button   onClick={()=>window.open(blog.author.twitter,'_blank')} className="h-full"><FaTwitter className='h-full text-[1rem] fill-[#8034eb]' /></button>
                <button   onClick={()=>window.open(blog.author.instagram,'_blank')} className="h-full"><FaInstagram className='h-full text-[1rem] fill-[#8034eb]'/></button>
                <button   onClick={()=>window.open(blog.author.linkedIn,'_blank')} className="h-full"><FaLinkedinIn className='h-full text-[1rem] fill-[#8034eb]'/></button>
            </div>   
            </div>
          </div>
          <div id='blogTitle' className='w-full'>
            <h2 className='text-[4rem]   font-bold my-[2rem]'>{blog.title}</h2>
          </div>
          <div id='blogImg' className='h-[45rem] w-full mt-[1rem]'>
             <img src={blog.imageURL} alt="" className='w-full h-full' />
          </div>
          <div id="blogContent" className='w-full mt-[2rem] px-[5rem]'>
            <p className='text-[1.8rem] leading-[4rem] text-gray-500 whitespace-pre-line .text-margin-start .text-margin-end .text-inline-start .text-inline-end '>
            {blog.content}
            </p>
          </div>
          <div className='px-[10rem] w-full flex justify-end'>
          <button className='h-[3rem] w-[3rem] '><FaComment className='w-[80%] h-[80%] flex items-center ' /></button>
          <p className='text-[1.8rem] text-gray-600  font-medium '>
           12
          </p>
          </div>
          </div>
        </article>
      </Section>
      <Section>
        <div className='px-[25rem] w-full mt-[2rem]'>
          <div className='w-[80%] flex justify-between h-[7rem] border-2 border-[#8034eb] p-[1rem] rounded mx-auto mb-2'>
           <p className='text-[2rem]'>Comment (<span>2</span>)</p>
           <button className='border-2 border-[#8034eb] px-[2rem] rounded-[.5rem] text-[1.5rem] text-[#8034eb]'> Write a Comment</button>
          </div>
          <form className='flex flex-col w-[80%] mx-auto'>
            <input type="text"  className='w-full text-[1.5rem] h-[3rem] rounded outline-none border-2 p-2 border-[#8034eb]' placeholder='Name' />
            <textarea cols="30" rows="10"  placeholder='Comment' className='rounded p-2 w-full text-[1.5rem] mt-[1rem] outline-none border-2 border-[#8034eb]'  />
            <button className='w-full bg-[#8034eb] text-[1.5rem] mt-2 py-2 rounded text-[white]'>Comment</button>
          </form>
        </div>
      </Section>
      <Section>
        <div className='px-[25rem] w-full mt-[2rem]'>
           <div className='w-[80%] mx-auto my-[2rem] bg-white p-5'>
            <div className='flex items-center'>
               <p className='text-[1.4rem] text-[#8034eb] mr-[2rem] font-bold'>Yayi</p>
               <p className='text-[1rem]' >July 17,2020</p>
            </div>
            <p className='text-[1.5rem] mt-1'>Nice Write up</p>
           </div>
           <div className='w-[80%] mx-auto my-[2rem] bg-white p-5'>
            <div className='flex items-center'>
               <p className='text-[1.4rem] text-[#8034eb] mr-[2rem] font-bold'>Biodun</p>
               <p className='text-[1rem]' >July 17,2020</p>
            </div>
            <p className='text-[1.5rem] mt-1'>Nice Write up</p>
           </div>
        </div>
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
