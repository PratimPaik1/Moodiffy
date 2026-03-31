import { useEffect, useContext } from "react";


import { AuthContext } from "../auth.contes";
import { login,register,getMe } from "../services/auth.api"


export function useAuth() {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading, authChecked, setAuthChecked } = context

    const handleLogin = async (username, password) => {
        setLoading(true)
        try {
            const response = await login(username, password)
            setUser(response.data.user)
            setAuthChecked(true)
            // console.log(response.data.user)
            return response
        }
        catch (err) {

            throw err
        }
        finally {
            setLoading(false)
        }
    }

    const handelRegister = async (userName, email, passwords) => {
        try {
            setLoading(true)
            const response = await register(userName, email, passwords)
            // console.log(response.data.user)
            setUser(response.data.user)
            setAuthChecked(true)
            return response
        }
        catch (err) {

            throw err
        }
        finally {
            setLoading(false)
        }
    }

    const handleGetMe =async ()=>{
        try{
            setLoading(true)
            const response=await getMe()
            setUser(response.data.user)

            return response.data.user
            

        }
        catch (err){
            setUser(null)
            throw err
        }
        finally{
            setLoading(false)
            setAuthChecked(true)
        }
    }


    useEffect(()=>{
        if (authChecked) return

        handleGetMe().catch(() => {})
    },[authChecked])


    return {
        user, loading, authChecked, handleLogin, handelRegister,handleGetMe
    }
}
