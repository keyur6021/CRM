const USERS_KEY = 'users'
const CURRENT_USER_KEY = 'currentUser'

const defaultUsers = [
  {
    id: 1,
    name: 'Admin',
    email: 'admin@gmail.com',
    password: '123456',
    dob: '2000-01-01',
    salary: 50000,
    number: '9876543210',
    role: 'admin',
    createdBy: null,
  },
]

const readJSON = (key, fallback) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

const writeJSON = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getUsers = () => {
  const users = readJSON(USERS_KEY, null)

  if (!Array.isArray(users)) {
    writeJSON(USERS_KEY, defaultUsers)
    return defaultUsers
  }

  return users
}

export const saveUsers = (users) => {
  writeJSON(USERS_KEY, users)
}

export const getCurrentUser = () => readJSON(CURRENT_USER_KEY, null)

export const saveCurrentUser = (user) => {
  writeJSON(CURRENT_USER_KEY, user)
}

export const removeCurrentUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY)
}

export const createUserId = (users) => {
  if (!users.length) {
    return 1
  }

  return Math.max(...users.map((user) => Number(user.id) || 0)) + 1
}
