import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPost } from '../store/posts/actions'
import { Link } from "react-router-dom"




export const BlogDetail = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const postDetail = useSelector(state => state.postDetail)
  const { loading,success,error,post } = postDetail
  const id = params.id

  console.log("id",id)
  console.log("post",post)

useEffect(()=>{
  dispatch(getPost(id))
},[])


return (
  <div>
    <div>
      {success && 
      <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <Link to={`/blog/${post.id}/edit`}>EditPost</Link>
      </div>
      }
    
    </div>
  </div>
)
}
