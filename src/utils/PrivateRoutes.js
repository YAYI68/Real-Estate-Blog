import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';



export const PrivateRoutes = () => {
  const {userInfo} = useStateContext();
  // const userLogin =  useSelector((state)=>state.userLogin)
  // const { userInfo } = userLogin
  console.log({userInfo})
  return (
    userInfo ? <Outlet /> : <Navigate to="/login" />
  )
}
