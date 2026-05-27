import { Link } from 'react-router-dom'
import DashboardCards from '../components/DashboardCards'
import { useAuth } from '../context/AuthContext'
import { canCreateUsers, getVisibleUsers, roleLabels } from '../utils/rolePermissions'

const Dashboard = () => {
  const { currentUser, users } = useAuth()
  const visibleUsers = getVisibleUsers(currentUser, users)

  return (
    <main className="page">
      <section className="dashboard-hero">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h1>Hello, {currentUser.name || currentUser.email}</h1>
          <p>
            Current role: <strong>{roleLabels[currentUser.role]}</strong>. Your workspace only shows
            the data your role can access.
          </p>
        </div>
        <div className="hero-actions">
          {canCreateUsers(currentUser) && (
            <Link className="button" to="/users/new">
              Add User
            </Link>
          )}
          <Link className="button button-ghost" to="/users">
            View Users
          </Link>
        </div>
      </section>

      <DashboardCards currentUser={currentUser} visibleUsers={visibleUsers} allUsers={users} />

      <section className="current-user-panel">
        <div>
          <span className="eyebrow">Logged-in User Info</span>
          <h2>{currentUser.name || 'Profile pending'}</h2>
        </div>
        <dl className="profile-grid">
          <div>
            <dt>Email</dt>
            <dd>{currentUser.email}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{roleLabels[currentUser.role]}</dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>{currentUser.number || 'Not added'}</dd>
          </div>
          <div>
            <dt>Visible Users</dt>
            <dd>{visibleUsers.length}</dd>
          </div>
        </dl>
      </section>
    </main>
  )
}

export default Dashboard
