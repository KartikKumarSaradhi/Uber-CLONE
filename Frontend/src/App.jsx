import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Start from './pages/Start';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';
import UserProtectedWrapper from './pages/UserProtectedWrapper';
import CaptainHome from './pages/CaptainHome';
import UserLogout from './pages/UserLogout';


const App = () => {

  
  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/home' element={
          <UserProtectedWrapper>
          <Home />
        </UserProtectedWrapper>
        } />
        <Route path='/user/logout' element ={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        }  />

        <Route path='/captain-home' element ={ <CaptainHome /> } />



        <Route path='/captain/logout' element ={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        }  />
      </Routes>
    </div>
  )
}


export default App