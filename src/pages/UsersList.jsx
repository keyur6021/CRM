import { useMemo, useState } from 'react'
import UserTable from '../components/UserTable'
import { useAuth } from '../context/AuthContext'
import { getVisibleUsers, roleLabels } from '../utils/rolePermissions'

const UsersList = () => {
  const { currentUser, users, deleteUser } = useAuth()
  const [query, setQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [notice, setNotice] = useState('')

  const visibleUsers = useMemo(() => getVisibleUsers(currentUser, users), [currentUser, users])

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return visibleUsers.filter((user) => {
      const matchesRole = roleFilter === 'all' || user.role === roleFilter
      const matchesQuery =
        !normalizedQuery ||
        user.name?.toLowerCase().includes(normalizedQuery) ||
        user.email.toLowerCase().includes(normalizedQuery) ||
        user.number?.includes(normalizedQuery)

      return matchesRole && matchesQuery
    })
  }, [query, roleFilter, visibleUsers])

  const handleDelete = (user) => {
    const confirmed = window.confirm(`Delete ${user.name || user.email}?`)
    if (!confirmed) {
      return
    }

    deleteUser(user.id)
    setNotice(`${user.name || user.email} was deleted.`)
  }

  return (
    <main className="page">
      <section className="page-heading inline-heading">
        <div>
          <span className="eyebrow">Users List</span>
          <h1>Role-aware directory</h1>
          <p>Search, filter, edit, and delete according to the logged-in role.</p>
        </div>
      </section>

      <section className="toolbar">
        <label className="search-field">
          <span>Search users</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Name, email, or number"
            type="search"
          />
        </label>
        <label className="filter-field">
          <span>Role</span>
          <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
            <option value="all">All roles</option>
            {Object.entries(roleLabels).map(([role, label]) => (
              <option key={role} value={role}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </section>

      {notice && <div className="alert success-alert">{notice}</div>}
      <UserTable currentUser={currentUser} users={filteredUsers} onDelete={handleDelete} />
    </main>
  )
}

export default UsersList
