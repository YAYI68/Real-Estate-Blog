import React, { Fragment, useEffect } from 'react'
import {Main} from "../components/Main";
import {Carousel} from "../components/Carousel"
import {Blog} from "../components/Blog";
import { getAllPublishPosts } from '../store/posts/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Footer } from '../components/Footer';


export const HomePage = () => {
  const dispatch = useDispatch();
  const postPublish = useSelector((state)=>state.postPublish) 

  const { loading, error,success, blogs} = postPublish;
   
  useEffect(()=>{       
    dispatch(getAllPublishPosts(6))
  },[dispatch])
 
  return (
    <Fragment>
    <Main> 
      {success && 
      <>
      <Carousel sliderBlogs = { blogs.slice(0,3)} />  
      <Blog blogs={blogs} />
      </>     
      }
    </Main>
    <Footer /> 
    </Fragment>
  )
}