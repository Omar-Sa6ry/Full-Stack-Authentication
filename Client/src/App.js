import { BrowserRouter, Route, Routes } from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.css'
import './css/tailwind.css'
import './css/main.css'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import ChangePassword from './pages/ChangePassword'
import ForgotPassword from './pages/ForgotPassword'
import { ToastContainer } from 'react-toastify'

function App () {
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />

      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/change-password' element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
