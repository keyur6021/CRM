export const roleLabels = {
  admin: 'Admin',
  manager: 'Manager',
  employee: 'Employee',
}

export const canCreateUsers = (user) =>
  user?.role === 'admin' || user?.role === 'manager'

export const getCreatableRoles = (user) => {
  if (user?.role === 'admin') {
    return ['manager', 'employee']
  }

  if (user?.role === 'manager') {
    return ['employee']
  }

  return []
}

export const canViewUser = (currentUser, targetUser) => {
  if (!currentUser || !targetUser) {
    return false
  }

  if (currentUser.role === 'admin') {
    return true
  }

  if (currentUser.role === 'manager') {
    return targetUser.id === currentUser.id || targetUser.createdBy === currentUser.id
  }

  return targetUser.id === currentUser.id
}

export const canUpdateUser = (currentUser, targetUser) => canViewUser(currentUser, targetUser)

export const canDeleteUser = (currentUser, targetUser) => {
  if (!currentUser || !targetUser) {
    return false
  }

  if (currentUser.role === 'admin') {
    return true
  }

  if (currentUser.role === 'manager') {
    return targetUser.id === currentUser.id || targetUser.createdBy === currentUser.id
  }

  return false
}

export const getVisibleUsers = (currentUser, users) =>
  users.filter((user) => canViewUser(currentUser, user))

export const getEditableRoles = (currentUser, targetUser) => {
  if (currentUser?.role === 'admin') {
    return ['admin', 'manager', 'employee']
  }

  if (currentUser?.role === 'manager') {
    return targetUser?.id === currentUser.id ? ['manager'] : ['employee']
  }

  return ['employee']
}
