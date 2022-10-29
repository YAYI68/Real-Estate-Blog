import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { Blog } from '../components/Blog'
import { Footer } from '../components/Footer';
import { Main } from '../components/Main'
import { getAllPublishPosts } from '../store/posts/actions';



export const BlogPage = () => {
  const dispatch = useDispatch();
  const postPublish = useSelector((state)=>state.postPublish) 
  const location = useLocation();
  const searchName = location.search?location.search.split('=')[1] : ""
  const title = searchName.toLowerCase()
  console.log({searchName})

  const { loading, error,success, blogs} = postPublish;
   
  useEffect(()=>{       
    dispatch(getAllPublishPosts(6))
  },[dispatch])
  return (
    <Fragment>
        {success && 
       <Fragment >
    <Main>
      <Blog blogs={blogs} title={title} />
    </Main>
    <Footer /> 
    </Fragment> 
     }
  
    </Fragment>
  )
}
