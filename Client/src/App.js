import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './css/tailwind.css'
import './css/main.css'

import Home from './pages/Home'
import Login from './pages/Login'
// import { OpenRoutes } from './routing/OpenRoutes'

function App () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          {/* <Route path='/forget-password' element={<ForgetPassword />} /> */}
          <Route path='/' element={<Home />} />
          {/* <Route
            path='/register'
            element={
              <OpenRoutes>
                <Register />
              </OpenRoutes>
            }
          /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
