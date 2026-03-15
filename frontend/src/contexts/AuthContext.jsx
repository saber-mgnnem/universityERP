// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load user from localStorage on initial mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('unierp_user')
      if (stored) setUser(JSON.parse(stored))
    } catch (error) {
      console.error('Failed to parse stored user', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const login = useCallback((userData) => {
    setUser(userData)
    localStorage.setItem('unierp_user', JSON.stringify(userData))
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('unierp_user')
  }, [])

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook to use the AuthContext
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}