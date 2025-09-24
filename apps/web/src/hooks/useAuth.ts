'use client'

import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"
import authStore from "@/store/AuthStore"
import { signupSchema } from "@/schema/AuthSchema"
import { loginUser, signupUser } from "@/services/authService"
import { SignupRequestType } from "@/types/Auth"

/**
 * Custom Hook for user registration
 */
const useRegister = () => {
    const { setUser, setToken, setIsAuthenticated } = authStore()

    const mutation = useMutation({
        mutationFn: signupUser,
        onSuccess: (data) => {
            setUser(data.user)
            setToken(data.jwt)
            setIsAuthenticated(true)
        }
    })

    const register = useCallback((userData: SignupRequestType) => {
        const validation = signupSchema.safeParse(userData)
        if (!validation.success) {
            console.error("Validation errors:", validation.error.issues)
            return { success: false, errors: validation.error.issues }
        }
        mutation.mutate(validation.data)
        return { success: true }
    }, [mutation])

    return {
        register,
        isLoading: mutation.isPending,
        error: mutation.error,
        isSuccess: mutation.isSuccess,
        reset: mutation.reset
    }
}


/**
 * Custom Hook for user login
 */
const useLogin = () => {
    const { setUser, setToken, setIsAuthenticated } = authStore()

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            setUser(data.user)
            setToken(data.jwt)
            setIsAuthenticated(true)
        }
    })

    const login = useCallback((credentials: { identifier: string; password: string }) => {
        mutation.mutate(credentials)
    }, [mutation])

    return {
        login,
        loading: mutation.isPending,
        error: mutation.error?.message || null,
        isSuccess: mutation.isSuccess,
        reset: mutation.reset
    }
}

/**
 * Custom Hook for user logout
 */
const useLogout = () => {
    const { logout } = authStore()
    
    return useCallback(() => {
        logout()
    }, [logout])
}

export { useRegister, useLogin, useLogout }