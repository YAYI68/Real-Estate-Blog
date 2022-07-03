import { 
     POST_LIST_REQUEST, 
     POST_LIST_SUCCESS,
     POST_LIST_FAIL ,

     POST_DETAIL_REQUEST,
     POST_DETAIL_SUCCESS,
     POST_DETAIL_FAIL,

     POST_CREATE_REQUEST,
     POST_CREATE_SUCCESS,
     POST_CREATE_FAIL,

     POST_UPDATE_REQUEST,
     POST_UPDATE_SUCCESS,
     POST_UPDATE_FAIL,


    } from "./actions";

export const  allPostReducer = (state={ posts:[]},action)=>{
    if(action.type === POST_LIST_REQUEST){
        return{loading:true}
    }
    if(action.type === POST_LIST_SUCCESS ){
        return{ loading:false, posts:action.payload,success:true}
    }
    if(action.type === POST_LIST_FAIL){
        return {loading:false, error:action.payload, success:true}
    }

  return state;
}

export const postDetailReducer = (state={ post:{}},action)=>{
    if(action.type === POST_DETAIL_REQUEST){
     return {loading:true}
    }
    if( action.type === POST_DETAIL_SUCCESS){
      return {loading:false,success:true, post:action.payload}
    }

    if(action.type === POST_DETAIL_FAIL){
        return {loading:false,success:false, error:action.payload}
    }
    return state
}

export const postCreateReducer = (state={ post:{}},action)=>{
    if(action.type === POST_CREATE_REQUEST){
     return {loading:true}
    }
    if( action.type === POST_CREATE_SUCCESS){
      return {loading:false,success:true, post:action.payload}
    }

    if(action.type === POST_CREATE_FAIL){
        return {loading:false,success:false, error:action.payload}
    }
    return state
}

export const postUpdateReducer = (state={ post:{}},action)=>{
    if(action.type === POST_UPDATE_REQUEST){
     return {loading:true}
    }
    if( action.type === POST_UPDATE_SUCCESS){
      return {loading:false,success:true, post:action.payload}
    }

    if(action.type === POST_UPDATE_FAIL){
        return {loading:false,success:false, error:action.payload}
    }
    return state
}