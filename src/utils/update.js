import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export  async function updateUserProfile(user,data){
    const {displayName,photoURL} = data;
    await updateProfile(user,{
        displayName,
        photoURL,
      });
      await setDoc(doc(db,"users",user.uid),{
        uid:user.uid,
        ...data,
        // displayName,
        // email,
        // headLine,
        // photoURL,
        // bio,
        // phoneNumber,
        // twitter,
        // facebook,
        // instagram, 
        // linkedIn
      })
}