import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { canCreateUsers, roleLabels } from '../utils/rolePermissions'

const Header = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  if (!currentUser) {
    return null
  }

  return (
    <header className="app-header">
      <div className="brand">
        <span className="brand-mark">E</span>
        <div>
          <strong>EmployeeMS</strong>
          <span>LocalStorage RBAC</span>
        </div>
      </div>

      <nav className="nav-links" aria-label="Primary navigation">
        <NavLink to="/dashboard">Dashboard</NavLink>
        {canCreateUsers(currentUser) && <NavLink to="/users/new">User Form</NavLink>}
        <NavLink to="/users">Users List</NavLink>
      </nav>

      <div className="session">
        <div className="role-pill">Logged in as: {roleLabels[currentUser.role]}</div>
        <button className="button button-ghost" type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}

export default Header
