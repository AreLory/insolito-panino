import React, { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import API_BASE_URL from "../config/api"

type AuthContextType = {
    token: string | null
    isAuthenticated: boolean
    login: (email:string, password:string) => Promise<void>
    logout: ()=>void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({children}: {children:React.ReactNode})=>{
    const [token, setToken] = useState<string|null>(null)

    useEffect(()=>{
        const activeToken = localStorage.getItem('token');
        if (activeToken) {
            setToken(activeToken)
        }
    },[])


    const login = async (email:string, password:string)=>{
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      const token = response.data.token
      localStorage.setItem('token', token)
      setToken(token)
    }

    const logout = ()=>{
        localStorage.removeItem('token')
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{token, isAuthenticated: !!token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth =()=>{
    const ctx = useContext(AuthContext);
    if(!ctx){
        throw new Error("useAuth must be used inside AuthProvider") 
    }
    return ctx
}