
// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import API from "@/services/api"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // 🔁 Load user on app start
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("token")

        if (!token) {
          setLoading(false)
          return
        }

        // 🔥 Get current user from backend
        const res = await API.get("/me")

        setUser(res.data)
        localStorage.setItem("user", JSON.stringify(res.data))

      } catch (err) {
        console.error("Auth init failed", err)
        logout()
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  // 🔐 LOGIN
const login = useCallback(async (email, password) => {
  const res = await API.post("/login", { email, password })

  const token = res.data.token
  localStorage.setItem("token", token)

  const userRes = await API.get("/me")

  setUser(userRes.data)
  localStorage.setItem("user", JSON.stringify(userRes.data))

  return userRes.data // ✅ IMPORTANT
}, [])

  // 🚪 LOGOUT
  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }, [])

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
