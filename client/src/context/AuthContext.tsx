import React, {createContext, useContext, useEffect, useState} from "react";
import jwtDecode from 'jwt-decode'
import type {User} from "@/interface/user";
import {getUserById} from "@/api/users";
import {login as apiLogin} from '@/api/auth'

type AuthContextProps = {
    user: User | null
    logout: () => void
    login: ({username, password}: { username: string, password: string }) => Promise<User | null>
}

type JWT = {
    sub: number
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    login: async () => {
        return null
    },
    logout: () => {
    }
})

const COOKIE_NAME = "mewo_reddit_auth"

export const useAuth = () => {
    return useContext(AuthContext);
}

const login = async ({
                         password,
                         username
                     }: { password: string, username: string }): Promise<AuthContextProps['user']> => {
    const response = await apiLogin(username, password)

    if (!response) {
        return null;
    }

    window.sessionStorage.setItem(COOKIE_NAME, response.tokens.access.token)

    return response.user
}

const logout = () => {
    window.sessionStorage.removeItem(COOKIE_NAME)
}

const parseToken = async (token: string): Promise<AuthContextProps['user']> => {
    const parsed = jwtDecode<JWT>(token)
    if (parsed.sub) {
        return await getUserById(parsed.sub, token)
    }
    return null
}

export const AuthContextProvider: React.FC<{ children: React.ReactElement }> = ({children}) => {

    const [user, setUser] = useState<AuthContextProps['user']>(null)

    useEffect(() => {
        (async () => {
            const token = window.sessionStorage.getItem(COOKIE_NAME)
            if (token) {
                const user = await parseToken(token)
                setUser(user)
            }
        })()
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
