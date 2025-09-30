import { User, RecyclingItem } from '../types'

// Storage keys
const STORAGE_KEYS = {
  CURRENT_USER: 'ecopass_current_user',
  USERS: 'ecopass_users',
  RECYCLING_ITEMS: 'ecopass_recycling_items',
}

// User functions
export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
  return user ? JSON.parse(user) : null
}

export const setCurrentUser = (user: User): void => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user))
}

export const clearCurrentUser = (): void => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
}

export const getUsers = (): User[] => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS)
  return users ? JSON.parse(users) : []
}

export const saveUser = (user: User): void => {
  const users = getUsers()
  const existingIndex = users.findIndex(u => u.id === user.id)

  if (existingIndex >= 0) {
    users[existingIndex] = user
  } else {
    users.push(user)
  }

  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
}

export const findUserByEmail = (email: string): User | undefined => {
  const users = getUsers()
  return users.find(u => u.email === email)
}

export const findUserByCpf = (cpf: string): User | undefined => {
  const users = getUsers()
  return users.find(u => u.cpf === cpf)
}

// Recycling functions
export const getRecyclingItems = (): RecyclingItem[] => {
  const items = localStorage.getItem(STORAGE_KEYS.RECYCLING_ITEMS)
  return items ? JSON.parse(items) : []
}

export const saveRecyclingItem = (item: RecyclingItem): void => {
  const items = getRecyclingItems()
  items.push(item)
  localStorage.setItem(STORAGE_KEYS.RECYCLING_ITEMS, JSON.stringify(items))
}

export const updateRecyclingItem = (itemId: string, updates: Partial<RecyclingItem>): void => {
  const items = getRecyclingItems()
  const index = items.findIndex(item => item.id === itemId)

  if (index >= 0) {
    items[index] = { ...items[index], ...updates }
    localStorage.setItem(STORAGE_KEYS.RECYCLING_ITEMS, JSON.stringify(items))
  }
}

export const getUserRecyclingItems = (userId: string): RecyclingItem[] => {
  const items = getRecyclingItems()
  return items.filter(item => item.userId === userId)
}

// Generate unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}
