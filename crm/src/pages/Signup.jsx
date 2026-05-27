import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { roleLabels } from '../utils/rolePermissions'
import { signupSchema } from '../utils/validationSchemas'

const Signup = () => {
  const { currentUser, signup } = useAuth()
  const navigate = useNavigate()
  const [signupError, setSignupError] = useState('')

  if (currentUser) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = (values, { setSubmitting }) => {
    setSignupError('')
    const result = signup(values)
    setSubmitting(false)

    if (!result.ok) {
      setSignupError(result.message)
      return
    }

    navigate('/login', { replace: true })
  }

  return (
    <main className="auth-page">
      <section className="auth-panel signup">
        <div className="auth-copy">
          <span className="brand-mark large">E</span>
          <span className="eyebrow">LocalStorage Signup</span>
          <h1>Create your account</h1>
          <p>Your profile is stored in the browser under the required users key.</p>
        </div>

        <Formik
          initialValues={{ email: '', password: '', role: 'employee' }}
          validationSchema={signupSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="auth-form">
              {signupError && <div className="alert error-alert">{signupError}</div>}
              <label className="field">
                <span>Email</span>
                <Field name="email" type="email" />
                <ErrorMessage className="error" component="small" name="email" />
              </label>
              <label className="field">
                <span>Password</span>
                <Field name="password" type="password" />
                <ErrorMessage className="error" component="small" name="password" />
              </label>
              <label className="field">
                <span>Role</span>
                <Field as="select" name="role">
                  {['admin', 'manager', 'employee'].map((role) => (
                    <option key={role} value={role}>
                      {roleLabels[role]}
                    </option>
                  ))}
                </Field>
                <ErrorMessage className="error" component="small" name="role" />
              </label>
              <button className="button" type="submit" disabled={isSubmitting}>
                Signup
              </button>
              <p className="auth-switch">
                Already registered? <Link to="/login">Login</Link>
              </p>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  )
}

export default Signup
