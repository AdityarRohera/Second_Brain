// import { useState } from 'react''
import './App.css'
import DashBoard from './pages/DashBoard';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

  import {Route, Routes } from 'react-router-dom';

function App() {
  
  return(
    <div className='bg-gray-100 w-[100vw] min-h-[100vh] flex justify-center items-center'>

        <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path='*' element={"Page Not Found"}/>
        </Routes>
      
    </div>
  )
}

export default App;
