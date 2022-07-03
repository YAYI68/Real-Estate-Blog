import { USER_LOGIN_REQUEST,
       USER_LOGIN_SUCCESS,
       USER_LOGIN_FAIL,
       USER_LOGOUT,

       REGISTER_USER_REQUEST,
       REGISTER_USER_SUCCESS,
       REGISTER_USER_FAIL,

       USER_PROFILE_REQUEST,
       USER_PROFILE_SUCCESS,
       USER_PROFILE_FAIL,

       USER_UPDATE_SUCCESS,
       USER_UPDATE_REQUEST,
       USER_UPDATE_FAIL,
       USER_UPDATE_RESET

} from "./actions";


export const  userLoginReducer = (state = {userInfo:{}},action)=>{
    if(action.type === USER_LOGIN_REQUEST){
        return {loading:true}
    }
    if(action.type === USER_LOGIN_SUCCESS){
        return {loading:false,userInfo:action.payload,success:true}
    }
    if(action.type === USER_LOGIN_FAIL ){
        return { loading:false,error:action.payload,success:false}
    }
    if(action.type === USER_LOGOUT){
        return {}
    }

    return state
}

export const  userRegisterReducer = (state = {userInfo:{}},action)=>{
    if(action.type === REGISTER_USER_REQUEST){
        return {loading:true}
    }
    if(action.type === REGISTER_USER_SUCCESS){
        return {loading:false,userInfo:action.payload,success:true}
    }
    
    if(action.type === REGISTER_USER_FAIL ){
        return { loading:false,error:action.payload,success:false}
    }

    return state
}


export const userProfileReducer = (state = { profile:{}},action)=>{

    if(action.type === USER_PROFILE_REQUEST){
        return{loading:true}
    }
    if(action.type  === USER_PROFILE_SUCCESS){
        return {loading:false,profile:action.payload,success:true}
    }
    if(action.type === USER_PROFILE_FAIL){
        return { loading:false,error:action.payload,success:false}
    }

    return state

}


export const updateProfileReducer = (state = {},action)=>{
    if(action.type === USER_UPDATE_REQUEST ){
        return {loading:true}
    }
    if(action.type  === USER_UPDATE_SUCCESS){
        return {loading:false,profileUpdate:action.payload,success:true}
    }
    if(action.type  === USER_UPDATE_FAIL){
        return {loading:false,error:action.payload,success:false}
    }
    if(action.type === USER_UPDATE_RESET){
        return {}
    }
    return state
}