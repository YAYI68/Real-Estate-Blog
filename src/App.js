
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { Routes,Route } from 'react-router-dom';
import { CreatePost } from './pages/CreatePost';
import { UserProfile } from './pages/UserProfile';
import { BlogDetail } from './pages/BlogDetail';
import { Header } from './components/Header';
import { DraftPage } from './pages/DraftPage';
import { PublishedPage } from './pages/PublishedPage';
import { BlogPage } from './pages/BlogPage';




function App() {
  return (
    <div className="App dark">
      <Header />
     <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/blogs' element={<BlogPage/>} />
      <Route path='/profile' element={<UserProfile/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/:slug' element={<BlogDetail/>}/>
      <Route path='/blogs/:id/edit' element={<CreatePost/>}/>
      <Route path='/blogs/draft' element={<DraftPage/>}/>
      <Route path='/blogs/public' element={<PublishedPage/>}/>
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