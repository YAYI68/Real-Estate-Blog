
 import { 
    BLOG_COMMENT_CREATE_REQUEST,
    BLOG_COMMENT_CREATE_SUCCESS,
    BLOG_COMMENT_CREATE_FAIL,
    BLOG_COMMENT_CREATE_RESET,
    
    BLOG_COMMENT_DELETE_REQUEST,
    BLOG_COMMENT_DELETE_SUCCESS,
    BLOG_COMMENT_DELETE_FAIL,

} from "./actions";

export const createCommentsReducer = (state={},action)=>{
    if(action.type ===BLOG_COMMENT_CREATE_REQUEST ){
        return{loading: true}
    } 

    if(action.type ===BLOG_COMMENT_CREATE_SUCCESS){
        return { loading: false, success: true,}
    }
    if(action.type ===BLOG_COMMENT_CREATE_FAIL){
        return { loading: false,success: false, error:action.payload}
    }
    if(action.type ===BLOG_COMMENT_CREATE_RESET){
        return {}
    }
    
    return state
}

export const deleteCommentReducer = (state={},action)=>{
    if(action.type === BLOG_COMMENT_DELETE_REQUEST){
        return { loading: true}
    }
    if(action.type === BLOG_COMMENT_DELETE_SUCCESS){
        return { loading:false, message:action.payload, success:true}
    }
    if(action.type === BLOG_COMMENT_DELETE_FAIL){
        return { loading:false, error:false, success:false}
    }

    return state
}
   
