import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './css/tailwind.css'
import './css/main.css'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
// import { OpenRoutes } from './routing/OpenRoutes'

function App () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/forget-password' element={<ForgotPassword />} />
          <Route path='/' element={<Home />} />
          <Route
            path='/register'
            element={
              // <OpenRoutes>
              <Register />
              // </OpenRoutes>
            }
          />
          <Route
            path='/forgotPassword'
            element={
              // <OpenRoutes>
              <ForgotPassword />
              // </OpenRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
