import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/ConfigAxios'

const register = async user => {
  const response = await axios.post(`${base_url}user/register`, user)
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
