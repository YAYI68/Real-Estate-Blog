import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore,doc,setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAFUT6hH0zaVvV3Y7Djjy7Phx_xTsG-lqc",
  authDomain: "blog-57a1c.firebaseapp.com",
  projectId: "blog-57a1c",
  storageBucket: "blog-57a1c.appspot.com",
  messagingSenderId: "250472069328",
  appId: "1:250472069328:web:02434c7de0f2dcab43c6d5",
  measurementId: "G-HC3GVTP4LK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)

export const  createtUserProfileDocument = async(user,additionData)=>{
  const userRef = doc(db,'users',user.uid)
  const { displayName,email,photoURL} = user
  const createdAt = new Date()
 
  if(!user)return  
  try{
    await setDoc(userRef,{
      displayName,
      email,
      photoURL,
      createdAt,
      ...additionData,
    })
  }
  catch(error){
    console.error(error.message)
  }
}
