import axios from 'axios'
import { base_url } from '../../constant/base_url'

const register = async userData => {
  console.log("gnkn")
  const response = await axios.post(`${base_url}user/register`, userData)
  if (response.data) {
    localStorage.setItem('customer', JSON.stringify(response.data))
  }
  return response.data
}

const login = async user => {
  const response = await axios.post(`${base_url}user/login`, user)
  if (response.data) {
    localStorage.setItem('customer', JSON.stringify(response.data))
  }
  return response.data
}

const forgetPasswordToken = async email => {
  const response = await axios.post(
    `${base_url}user/Forgot-Password-Token`,
    email
  )
  if (response.data) {
    return response.data
  }
}

const authService = {
  register,
  login,
  forgetPasswordToken
}

export default authService
