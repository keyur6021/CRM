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
      <section className="auth-panel signup fade-in-up">
        <div className="auth-copy">
          <svg className="brand-mark large" viewBox="0 0 42 42" width="58" height="58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGradLg" x1="0" y1="0" x2="42" y2="42">
                <stop offset="0%" stopColor="#4f8cff" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="42" height="42" rx="10" fill="url(#logoGradLg)" />
            <rect x="1" y="1" width="40" height="20" rx="9" fill="rgba(255,255,255,0.08)" />
            <circle cx="31" cy="11" r="3" fill="rgba(255,255,255,0.3)" />
            <path d="M10 12h22v2.8H13v4.4h17v2.8H13v4.4h19v2.8H10V12z" fill="#ffffff" />
          </svg>
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
            <Form className="auth-form stagger-children">
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
