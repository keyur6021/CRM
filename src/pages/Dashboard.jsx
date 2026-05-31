import { Link } from 'react-router-dom'
import DashboardCards from '../components/DashboardCards'
import { useAuth } from '../context/AuthContext'
import { canCreateUsers, getVisibleUsers, roleLabels } from '../utils/rolePermissions'

const Dashboard = () => {
  const { currentUser, users } = useAuth()
  const visibleUsers = getVisibleUsers(currentUser, users)
  const displayName = currentUser.name || currentUser.email
  const profileFields = [currentUser.name, currentUser.email, currentUser.number, currentUser.dob, currentUser.salary]
  const completedFields = profileFields.filter(Boolean).length
  const profileCompletion = Math.round((completedFields / profileFields.length) * 100)
  const accessCopy = {
    admin: 'Full workspace visibility with permission to create, update, and remove CRM users.',
    manager: 'Manager visibility for your profile and employees created under your account.',
    employee: 'Personal profile visibility with a focused read-only workspace.',
  }

  return (
    <main className="page">
      <section className="dashboard-hero">
        <div className="hero-copy">
          <span className="eyebrow">Dashboard</span>
          <h1>Hello, {displayName}</h1>
          <p>
            You are signed in as <strong>{roleLabels[currentUser.role]}</strong>. Your workspace is tuned
            to the data and actions available to your role.
          </p>
          <div className="hero-meta" aria-label="Dashboard summary">
            <span>{visibleUsers.length} visible profiles</span>
            <span>{profileCompletion}% profile complete</span>
            <span>{roleLabels[currentUser.role]} access</span>
          </div>
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

      <section className="dashboard-workspace" aria-label="Workspace details">
        <article className="current-user-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Access Overview</span>
              <h2>{roleLabels[currentUser.role]} workspace</h2>
            </div>
            <span className={`role-badge ${currentUser.role}`}>{roleLabels[currentUser.role]}</span>
          </div>
          <p className="panel-copy">{accessCopy[currentUser.role]}</p>
          <dl className="profile-grid profile-grid-compact">
            <div>
              <dt>Email</dt>
              <dd>{currentUser.email}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{currentUser.number || 'Not added'}</dd>
            </div>
            <div>
              <dt>Visible Users</dt>
              <dd>{visibleUsers.length}</dd>
            </div>
            <div>
              <dt>Profile Status</dt>
              <dd>{profileCompletion}% complete</dd>
            </div>
          </dl>
        </article>

        <aside className="next-actions" aria-label="Recommended actions">
          <div>
            <span className="eyebrow">Next Actions</span>
            <h2>Move quickly</h2>
          </div>
          <div className="action-list">
            <Link to="/users" className="action-row">
              <span>Browse users</span>
              <strong>{visibleUsers.length}</strong>
            </Link>
            {canCreateUsers(currentUser) && (
              <Link to="/users/new" className="action-row">
                <span>Create profile</span>
                <strong>New</strong>
              </Link>
            )}
            <div className="action-row muted-row">
              <span>Role scope</span>
              <strong>{roleLabels[currentUser.role]}</strong>
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default Dashboard
