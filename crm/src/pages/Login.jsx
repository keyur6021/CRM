import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { loginSchema } from '../utils/validationSchemas'

const Login = () => {
  const { currentUser, login } = useAuth()
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState('')

  if (currentUser) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = (values, { setSubmitting }) => {
    setLoginError('')
    const result = login(values)
    setSubmitting(false)

    if (!result.ok) {
      setLoginError(result.message)
      return
    }

    navigate('/dashboard', { replace: true })
  }

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <div className="auth-copy">
          <span className="brand-mark large">E</span>
          <span className="eyebrow">Employee Management System</span>
          <h1>Welcome back</h1>
          <p>Sign in to manage employees with role-based permissions and persistent LocalStorage data.</p>
        </div>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="auth-form">
              {loginError && <div className="alert error-alert">{loginError}</div>}
              <label className="field">
                <span>Email</span>
                <Field name="email" type="email" placeholder="admin@gmail.com" />
                <ErrorMessage className="error" component="small" name="email" />
              </label>
              <label className="field">
                <span>Password</span>
                <Field name="password" type="password" placeholder="123456" />
                <ErrorMessage className="error" component="small" name="password" />
              </label>
              <button className="button" type="submit" disabled={isSubmitting}>
                Login
              </button>
              <p className="auth-switch">
                New here? <Link to="/signup">Create an account</Link>
              </p>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  )
}

export default Login
