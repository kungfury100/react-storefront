import { AuthContext } from '@/context/AuthContext'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function RequireAuth() {
  const {isLoggedIn} = useContext(AuthContext);


  if (!isLoggedIn) {
    return <Navigate to="login" />
  }

  return (
    <Outlet />
  )
}

export default RequireAuth