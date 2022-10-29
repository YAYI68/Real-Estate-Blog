import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../firebaseConfig';



export const PrivateRoutes = () => {
  return (
    auth.currentUser ? <Outlet /> : <Navigate to="/login" />
  )
}
