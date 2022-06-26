import logo from './logo.svg';
import './App.css';
import { doc, collection, getDocs} from "firebase/firestore";
import { db } from './firebaseConfig';
import { useEffect } from 'react';

function App() {
 const posts = collection(db,'posts')

 useEffect(()=>{
  getPosts()
 },[])

 const getPosts = async ()=>{
     const snapshot = await getDocs(posts)
     const allposts = snapshot.docs.map(post=>({id: post.id,...post.data()}))
     console.log(allposts)
 }
  
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
