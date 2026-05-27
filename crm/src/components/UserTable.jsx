import { Link } from 'react-router-dom'
import { canDeleteUser, canUpdateUser, roleLabels } from '../utils/rolePermissions'

const UserTable = ({ currentUser, users, onDelete }) => {
  if (!users.length) {
    return (
      <div className="empty-state">
        <h2>No users found</h2>
        <p>Try changing the search or role filter.</p>
      </div>
    )
  }

  return (
    <div className="table-shell">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Salary</th>
            <th>Number</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name || '-'}</td>
              <td>{user.email}</td>
              <td>{user.dob || '-'}</td>
              <td>{user.salary ? `₹${Number(user.salary).toLocaleString('en-IN')}` : '-'}</td>
              <td>{user.number || '-'}</td>
              <td>
                <span className={`role-badge ${user.role}`}>{roleLabels[user.role]}</span>
              </td>
              <td>
                <div className="row-actions">
                  {canUpdateUser(currentUser, user) && (
                    <Link className="button button-small" to={`/users/${user.id}/edit`}>
                      Edit
                    </Link>
                  )}
                  {canDeleteUser(currentUser, user) && (
                    <button
                      className="button button-small button-danger"
                      type="button"
                      onClick={() => onDelete(user)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
