import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  canCreateUsers,
  canUpdateUser,
  getCreatableRoles,
  getEditableRoles,
  roleLabels,
} from '../utils/rolePermissions'
import { userSchema } from '../utils/validationSchemas'

const emptyUser = {
  name: '',
  email: '',
  password: '',
  dob: '',
  salary: '',
  number: '',
  role: '',
}

const FormField = ({ label, name, type = 'text', children }) => (
  <label className="field">
    <span>{label}</span>
    {children || <Field name={name} type={type} />}
    <ErrorMessage className="error" component="small" name={name} />
  </label>
)

const UserForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser, users, createUser, updateUser } = useAuth()
  const [formError, setFormError] = useState('')
  const isEdit = Boolean(id)
  const targetUser = isEdit ? users.find((user) => user.id === Number(id)) : null

  const roleOptions = useMemo(() => {
    if (isEdit) {
      return getEditableRoles(currentUser, targetUser)
    }

    return getCreatableRoles(currentUser)
  }, [currentUser, isEdit, targetUser])

  if (isEdit && (!targetUser || !canUpdateUser(currentUser, targetUser))) {
    return (
      <main className="page">
        <div className="empty-state">
          <h1>Access denied</h1>
          <p>You do not have permission to edit this profile.</p>
        </div>
      </main>
    )
  }

  if (!isEdit && !canCreateUsers(currentUser)) {
    return (
      <main className="page">
        <div className="empty-state">
          <h1>Access denied</h1>
          <p>Your role cannot create users.</p>
        </div>
      </main>
    )
  }

  const initialValues = isEdit
    ? {
        name: targetUser.name || '',
        email: targetUser.email || '',
        password: targetUser.password || '',
        dob: targetUser.dob || '',
        salary: targetUser.salary || '',
        number: targetUser.number || '',
        role: targetUser.role || roleOptions[0] || '',
      }
    : { ...emptyUser, role: roleOptions[0] || '' }

  const handleSubmit = (values, { setSubmitting }) => {
    setFormError('')
    const result = isEdit ? updateUser(id, values) : createUser(values)
    setSubmitting(false)

    if (!result.ok) {
      setFormError(result.message)
      return
    }

    navigate('/users')
  }

  return (
    <main className="page">
      <section className="page-heading">
        <span className="eyebrow">{isEdit ? 'Update Profile' : 'Create User'}</span>
        <h1>{isEdit ? 'Edit employee record' : 'Add a new team member'}</h1>
        <p>
          {currentUser.role === 'manager'
            ? 'Managers can create and manage employees assigned to them.'
            : 'Admins can create managers and employees, and maintain every record.'}
        </p>
      </section>

      <section className="form-panel">
        {formError && <div className="alert error-alert">{formError}</div>}
        <Formik initialValues={initialValues} validationSchema={userSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="user-form">
              <div className="form-grid">
                <FormField label="Name" name="name" />
                <FormField label="Email" name="email" type="email" />
                <FormField label="Password" name="password" type="password" />
                <FormField label="DOB" name="dob" type="date" />
                <FormField label="Salary" name="salary" type="number" />
                <FormField label="Number" name="number" />
                <FormField label="Role" name="role">
                  <Field as="select" name="role" disabled={roleOptions.length <= 1}>
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>
                        {roleLabels[role]}
                      </option>
                    ))}
                  </Field>
                </FormField>
              </div>

              <div className="form-actions">
                <button className="button" type="submit" disabled={isSubmitting}>
                  {isEdit ? 'Update User' : 'Create User'}
                </button>
                <button
                  className="button button-ghost"
                  type="button"
                  onClick={() => navigate('/users')}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  )
}

export default UserForm
