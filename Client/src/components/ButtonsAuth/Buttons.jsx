import React from 'react'
import GitHupAuth from './GitHupAuth'
import XAuth from './XAuth'
import FacebookAuth from './FacebookAuth'
import GoogleAuth from './GoogleAuth'
import '../../css/AuthButtons.css'

const Buttons = props => {
  const { googleAuth, facebookAuth, xAuth, gitHubAuth } = props
  return (
    <div className='mt-6 flex flex-wrap' style={{ gap: '2%' }}>
      <GoogleAuth onClick={googleAuth} />
      <XAuth onClick={xAuth} />
      <GitHupAuth onClick={gitHubAuth} />
      <FacebookAuth onClick={facebookAuth} />
    </div>
  )
}

export default Buttons
