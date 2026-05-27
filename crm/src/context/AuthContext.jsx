import { createContext, useContext, useMemo, useState } from 'react'
import {
  createUserId,
  getCurrentUser,
  getUsers,
  removeCurrentUser,
  saveCurrentUser,
  saveUsers,
} from '../utils/localStorage'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [users, setUsersState] = useState(() => getUsers())
  const [currentUser, setCurrentUserState] = useState(() => getCurrentUser())

  const persistUsers = (nextUsers) => {
    saveUsers(nextUsers)
    setUsersState(nextUsers)

    const freshCurrentUser = nextUsers.find((user) => user.id === currentUser?.id)
    if (freshCurrentUser) {
      saveCurrentUser(freshCurrentUser)
      setCurrentUserState(freshCurrentUser)
    }
  }

  const signup = ({ email, password, role }) => {
    const normalizedEmail = email.trim().toLowerCase()
    const emailExists = users.some((user) => user.email.toLowerCase() === normalizedEmail)

    if (emailExists) {
      return { ok: false, message: 'An account with this email already exists.' }
    }

    const user = {
      id: createUserId(users),
      name: normalizedEmail.split('@')[0],
      email: normalizedEmail,
      password,
      dob: '',
      salary: '',
      number: '',
      role,
      createdBy: null,
    }

    persistUsers([...users, user])
    return { ok: true }
  }

  const login = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase()
    const user = users.find(
      (item) => item.email.toLowerCase() === normalizedEmail && item.password === password,
    )

    if (!user) {
      return { ok: false, message: 'Invalid email or password.' }
    }

    saveCurrentUser(user)
    setCurrentUserState(user)
    return { ok: true }
  }

  const logout = () => {
    removeCurrentUser()
    setCurrentUserState(null)
  }

  const createUser = (values) => {
    const normalizedEmail = values.email.trim().toLowerCase()
    const emailExists = users.some((user) => user.email.toLowerCase() === normalizedEmail)

    if (emailExists) {
      return { ok: false, message: 'Email is already used by another user.' }
    }

    const user = {
      ...values,
      id: createUserId(users),
      email: normalizedEmail,
      salary: Number(values.salary),
      createdBy: currentUser?.role === 'manager' ? currentUser.id : null,
    }

    persistUsers([...users, user])
    return { ok: true, user }
  }

  const updateUser = (id, values) => {
    const normalizedEmail = values.email.trim().toLowerCase()
    const numericId = Number(id)
    const emailExists = users.some(
      (user) => user.id !== numericId && user.email.toLowerCase() === normalizedEmail,
    )

    if (emailExists) {
      return { ok: false, message: 'Email is already used by another user.' }
    }

    const nextUsers = users.map((user) =>
      user.id === numericId
        ? {
            ...user,
            ...values,
            email: normalizedEmail,
            salary: Number(values.salary),
            createdBy: user.createdBy ?? null,
          }
        : user,
    )

    persistUsers(nextUsers)
    return { ok: true }
  }

  const deleteUser = (id) => {
    const numericId = Number(id)
    const nextUsers = users.filter((user) => user.id !== numericId)
    persistUsers(nextUsers)

    if (currentUser?.id === numericId) {
      logout()
    }
  }

  const value = useMemo(
    () => ({
      users,
      currentUser,
      signup,
      login,
      logout,
      createUser,
      updateUser,
      deleteUser,
    }),
    [users, currentUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
