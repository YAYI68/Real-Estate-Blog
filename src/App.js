
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { Routes,Route } from 'react-router-dom';
import { CreatePost } from './pages/CreatePost';
import { UserProfile } from './pages/UserProfile';
import { BlogDetail } from './pages/BlogDetail';
import { Header } from './components/Header';
import { DraftPage } from './pages/DraftPage';
import { BlogPage } from './pages/BlogPage';
import { useStateContext } from './context/ContextProvider';
import { useEffect } from 'react';
import { PrivateRoutes } from './utils/PrivateRoutes';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";




function App() {
   const { currentMode } = useStateContext();
   useEffect(() => {
    
    if(currentMode === "Dark"){
      document.body.classList.add("bg-dark");
      document.body.style.backgroundColor="black"
    }
   
     return () => {
     }
   }, [currentMode])
   
  return (
    <div className={ `  ${currentMode==="Dark"?"dark":""}  dark:bg-black bg-[#eee] min-h-[100vh]`}>
      <Header />
     <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/blogs' element={<BlogPage/>} />
      <Route path='/profile' element={<UserProfile/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/:slug' element={<BlogDetail/>}/>
      <Route  element={<PrivateRoutes /> } >
      <Route path='/blogs/:id/edit' element={<CreatePost/>}/>
      <Route path='/blogs/draft' element={<DraftPage/>}/>
      </Route>
     </Routes> 
    </div>
  );
}





export default App;
// 

  //  <Routes >
  //       <Route path="/" element={ <HomePage /> } />
  //       <Route path="/:id" element={ <BlogDetail /> } />
  //       <Route path="/login"  element={ <LoginPage /> } />
  //       <Route path="/register" element={ <RegisterPage /> } />
  //       <Route path="/blog/:id/edit" element={ <CreatePost /> } />
  //       <Route path="/profile" element={ <UserProfile /> } />
  //       <Route path="/profile/edit" element={ <EditProfile /> } />
  //     </Routes> 