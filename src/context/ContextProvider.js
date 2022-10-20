import { onAuthStateChanged } from "firebase/auth";
import { useContext, createContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";


const stateContext = createContext();




export const ContextProvider = ({children}) => {
    const [userInfo, setUserInfo ] = useState();

       
useEffect(() => {
  const unSub = onAuthStateChanged(auth,(user)=>{
    if(user){
      setUserInfo(user)      
    }
    else{
      setUserInfo("")
    }
  })
  return () => {
    unSub();
 }
  }, [])

  return (
    <stateContext.Provider   value={{
      userInfo,
    }}>
       { children }
    </stateContext.Provider>
  )
}

export const useStateContext = ()=> useContext(stateContext)

