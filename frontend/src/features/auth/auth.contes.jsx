import { createContext, useState } from "react"

export const AuthContext = createContext()


export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [authChecked, setAuthChecked] = useState(false)
    

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading, authChecked, setAuthChecked }}>
            {children}
        </AuthContext.Provider>
    )
}
