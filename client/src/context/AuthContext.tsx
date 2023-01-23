import React, {createContext, useContext, useEffect, useState} from "react";
import jwtDecode from 'jwt-decode'
import type {User} from "../interface/user";
import {POST} from "../api/api";

type AuthContextProps = {
    user: User | null
    logout: () => void
    login: ({username, password}: { username: string, password: string }) => Promise<AuthContextProps['user']>
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    login: async () => {
        return null
    },
    logout: () => {
    }
})

const COOKIE_NAME = "mewo_twitter_auth"

export const useAuth = () => {
    return useContext(AuthContext);
}

const login = async ({
                         password,
                         username
                     }: { password: string, username: string }): Promise<AuthContextProps['user']> => {
    const response = await POST<{ token: string, message?: string }>('/signin', {
        name: username,
        password
    })

    if (response.message) {
        return null;
    }

    const user = parseToken(response.token)
    if (user) {
        window.sessionStorage.setItem(COOKIE_NAME, response.token)
    }

    return user
}

const logout = () => {
    window.sessionStorage.removeItem(COOKIE_NAME)
}

const parseToken = (token: string): AuthContextProps['user'] => {
    const parsed = jwtDecode<Pick<AuthContextProps, 'user'>>(token)
    if (parsed.user) {
        return parsed.user
    }
    return null
}

export const AuthContextProvider: React.FC<{ children: React.ReactElement }> = ({children}) => {

    const [user, setUser] = useState<AuthContextProps['user']>(null)

    useEffect(() => {
        const token = window.sessionStorage.getItem(COOKIE_NAME)
        if (token) {
            const user = parseToken(token)
            setUser(user)
        }
    }, [])

    const handleLogin = async ({username, password}: { username: string, password: string }) => {
        const user = await login({username, password})
        setUser(user)
        return user
    }

    const handleLogout = () => {
        logout()
        setUser(null)
    }


    return (
        <AuthContext.Provider
            value={{
                user: user,
                logout: handleLogout,
                login: handleLogin
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
