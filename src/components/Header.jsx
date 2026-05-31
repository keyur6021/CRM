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
        <svg className="brand-mark" viewBox="0 0 42 42" width="42" height="42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="42" y2="42">
              <stop offset="0%" stopColor="#4f8cff" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="42" height="42" rx="10" fill="url(#logoGrad)" />
          <rect x="1" y="1" width="40" height="20" rx="9" fill="rgba(255,255,255,0.08)" />
          <circle cx="31" cy="11" r="3" fill="rgba(255,255,255,0.3)" />
          <path d="M10 12h22v2.8H13v4.4h17v2.8H13v4.4h19v2.8H10V12z" fill="#ffffff" />
        </svg>
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
