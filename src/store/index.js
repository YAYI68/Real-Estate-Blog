

import { configureStore } from '@reduxjs/toolkit';
import {
   allPostReducer, 
   postCreateReducer, 
   postDetailReducer,
   postUpdateReducer, 
  } from './posts/reducer';

import { 
  updateProfileReducer,
   userLoginReducer,
   userProfileReducer,
   userRegisterReducer 
  } from './users/reducer';

  
  const userInfoLocalStorage = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')) : null
  
  const preloadedState = {
      userLogin:{
          userInfo:userInfoLocalStorage,
       },
   }
const reducer = {
     userLogin:userLoginReducer,
     userRegister:userRegisterReducer,
     postList:allPostReducer,
     userProfile:userProfileReducer,
     updatedProfile:updateProfileReducer,
     postDetail:postDetailReducer,
     postCreate:postCreateReducer,
     postUpdate:postUpdateReducer,       
}



export const store = configureStore({
    reducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

}
)
