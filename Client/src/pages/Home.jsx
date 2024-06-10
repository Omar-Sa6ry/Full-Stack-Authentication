import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  let getTokenFromLocalStorage = JSON.parse(
    localStorage?.getItem('customer')
  )?.token

  return (
    <div className='flex items-center bg-blue-900 text-white justify-center h-dvh '>
      <div className='  text-8xl font-bold text-center'>Welcome to my Page</div>
      {getTokenFromLocalStorage ? (
        <Link className='goToProfile' to='profile'>
          Go to Your Profile
        </Link>
      ) : (
        <Link className='goToProfile' to='profile'>
          Login
        </Link>
      )}
    </div>
  )
}

export default Home
