import { Navigate } from 'react-router-dom'

export const OpenRoutes = ({ children }) => {
  const getTokenFromLocalStorage = JSON.parse(
    localStorage?.getItem('customer')
  )?.token
  return getTokenFromLocalStorage ? (
    <Navigate to='/' replace={true} />
  ) : (
    children
  )
}
