'use client'

import { useCallback, useState } from "react"
import { signup } from "@/actions/auth"
import authStore from "@/store/AuthStore"
import { AuthStoreType } from "@/types/User"

const useRegister = () => {
    const [error, setError] = useState<null | { message: string }> (null)
    const [loading, setLoading] = useState(false)

    const register = useCallback(async ({ username, email, password }: {username: string, email: string, password: string}) => {
        setLoading(true)
        setError(null)

        const { setUser, setToken, setIsAuthenticated }: AuthStoreType = authStore.getState()

        try {
            const response = await signup(username, email, password)
            response?.user && setUser(response.user)
            response?.jwt && setToken(response.jwt)
            setIsAuthenticated(true)

        } catch (error: Error | any) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [])

    return { error, loading, register }
}

export default useRegister