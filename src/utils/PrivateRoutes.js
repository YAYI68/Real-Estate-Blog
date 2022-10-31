import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';



export const PrivateRoutes = () => {
  const userLogin =  useSelector((state)=>state.userLogin)
  const { userInfo } = userLogin
  console.log({userInfo})
  return (
    userInfo ? <Outlet /> : <Navigate to="/login" />
  )
}
