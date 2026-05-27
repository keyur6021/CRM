import { roleLabels } from '../utils/rolePermissions'

const StatCard = ({ label, value, tone }) => (
  <article className={`stat-card ${tone || ''}`}>
    <span>{label}</span>
    <strong>{value}</strong>
  </article>
)

const DashboardCards = ({ currentUser, visibleUsers, allUsers }) => {
  const totalEmployees = allUsers.filter((user) => user.role === 'employee').length
  const totalManagers = allUsers.filter((user) => user.role === 'manager').length
  const managedEmployees = visibleUsers.filter(
    (user) => user.role === 'employee' && user.createdBy === currentUser.id,
  ).length

  if (currentUser.role === 'employee') {
    return (
      <div className="profile-panel">
        <div>
          <span className="eyebrow">Employee Profile</span>
          <h2>{currentUser.name || currentUser.email}</h2>
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
            <dt>DOB</dt>
            <dd>{currentUser.dob || 'Not added'}</dd>
          </div>
          <div>
            <dt>Salary</dt>
            <dd>{currentUser.salary ? `₹${Number(currentUser.salary).toLocaleString('en-IN')}` : 'Not added'}</dd>
          </div>
        </dl>
      </div>
    )
  }

  if (currentUser.role === 'manager') {
    return (
      <section className="stats-grid" aria-label="Manager stats">
        <StatCard label="Managed Employees" value={managedEmployees} tone="green" />
        <StatCard label="Visible Profiles" value={visibleUsers.length} tone="blue" />
      </section>
    )
  }

  return (
    <section className="stats-grid" aria-label="Admin stats">
      <StatCard label="Total Users" value={allUsers.length} tone="blue" />
      <StatCard label="Total Managers" value={totalManagers} tone="amber" />
      <StatCard label="Total Employees" value={totalEmployees} tone="green" />
    </section>
  )
}

export default DashboardCards
