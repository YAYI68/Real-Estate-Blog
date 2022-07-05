
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { Routes,Route } from 'react-router-dom';
import { CreatePost } from './pages/CreatePost';
import { UserProfile } from './pages/UserProfile';
import { BlogDetail } from './pages/BlogDetail';
import { EditProfile } from './pages/EditProfile';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Carousel } from './components/Carousel';




// blue #8034eb
// orange #e6c20e



function App() {


  return (
    <div className="App">
      <Header />
      <Main>
        <Carousel />
      </Main>
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