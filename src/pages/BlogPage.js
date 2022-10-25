import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Blog } from '../components/Blog'
import { Main } from '../components/Main'
import { getAllPublishPosts } from '../store/posts/actions';



export const BlogPage = () => {
  const dispatch = useDispatch();
  const postPublish = useSelector((state)=>state.postPublish) 

  const { loading, error,success, blogs} = postPublish;
   
  useEffect(()=>{       
    dispatch(getAllPublishPosts(6))
  },[dispatch])
  return (
    <Main>
      {success && 
      <Blog blogs={blogs} />
      }
    </Main>
  )
}
