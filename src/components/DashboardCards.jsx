import { roleLabels } from '../utils/rolePermissions'

const formatCurrency = (value) => `Rs. ${Number(value).toLocaleString('en-IN')}`

const StatCard = ({ label, value, meta, tone, marker }) => (
  <article className={`stat-card ${tone || ''}`}>
    <div className="stat-card-top">
      <span>{label}</span>
      {marker && <i aria-hidden="true">{marker}</i>}
    </div>
    <strong>{value}</strong>
    {meta && <small>{meta}</small>}
  </article>
)

const DashboardCards = ({ currentUser, visibleUsers, allUsers }) => {
  const totalEmployees = allUsers.filter((user) => user.role === 'employee')?.length
  const totalManagers = allUsers.filter((user) => user.role === 'manager')?.length
  const managedEmployees = visibleUsers.filter(
    (user) => user.role === 'employee' && user.createdBy === currentUser.id,
  ).length
  const visibleEmployees = visibleUsers.filter((user) => user.role === 'employee')?.length
  const visibleManagers = visibleUsers.filter((user) => user.role === 'manager')?.length

  if (currentUser.role === 'employee') {
    return (
      <div className="profile-panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Employee Profile</span>
            <h2>{currentUser?.name || currentUser?.email}</h2>
          </div>
          <span className="role-badge employee">{roleLabels[currentUser?.role]}</span>
        </div>
        <dl className="profile-grid profile-grid-compact">
          <div>
            <dt>Email</dt>
            <dd>{currentUser?.email}</dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>{currentUser?.number || 'Not added'}</dd>
          </div>
          <div>
            <dt>DOB</dt>
            <dd>{currentUser?.dob || 'Not added'}</dd>
          </div>
          <div>
            <dt>Salary</dt>
            <dd>{currentUser?.salary ? formatCurrency(currentUser.salary) : 'Not added'}</dd>
          </div>
        </dl>
      </div>
    )
  }

  if (currentUser?.role === 'manager') {
    return (
      <section className="dashboard-overview" aria-label="Manager overview">
        <div className="overview-copy">
          <span className="eyebrow">Team Scope</span>
          <h2>{managedEmployees} direct reports in view</h2>
          <p>Use this space to keep an eye on your team records and jump into profile management.</p>
        </div>
        <div className="stats-grid">
          <StatCard
            label="Managed Employees"
            value={managedEmployees}
            meta="Created under your manager account"
            tone="green"
            marker="ME"
          />
          <StatCard
            label="Visible Profiles"
            value={visibleUsers.length}
            meta={`${visibleEmployees} employees available`}
            tone="blue"
            marker="VP"
          />
        </div>
      </section>
    )
  }

  return (
    <section className="dashboard-overview" aria-label="Admin overview">
      <div className="overview-copy">
        <span className="eyebrow">Workspace Summary</span>
        <h2>{allUsers.length} profiles across the CRM</h2>
        <p>Monitor your user base, manager coverage, and employee records from one calm control surface.</p>
      </div>
      <div className="stats-grid">
        <StatCard
          label="Total Users"
          value={allUsers.length}
          meta={`${visibleUsers.length} visible to you`}
          tone="blue"
          marker="TU"
        />
        <StatCard
          label="Total Managers"
          value={totalManagers}
          meta={`${visibleManagers} managers in current view`}
          tone="amber"
          marker="TM"
        />
        <StatCard
          label="Total Employees"
          value={totalEmployees}
          meta={`${visibleEmployees} employee profiles visible`}
          tone="green"
          marker="TE"
        />
      </div>
    </section>
  )
}

export default DashboardCards
