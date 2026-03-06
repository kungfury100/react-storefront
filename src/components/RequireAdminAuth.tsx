import { AuthContext } from '@/context/AuthContext'
import { useContext } from 'react'
import { Outlet } from 'react-router-dom'

function RequireAdminAuth() {
  const {user} = useContext(AuthContext);


  if (user.role !== "admin") {
    return <div>No admin rights</div>
  }

  return (
    <Outlet />
  )
}

export default RequireAdminAuth