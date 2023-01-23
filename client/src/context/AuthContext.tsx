import React, {createContext, useContext, useEffect, useState} from "react";
import jwtDecode from 'jwt-decode'
import type {User} from "@/interface/user";
import {getUserById} from "@/api/users";
import {login as apiLogin, register as apiRegister} from '@/api/auth'

type AuthContextProps = {
    user: User | null
    token: string | null
    logout: () => void
    login: ({email, password}: { email: string, password: string }) => Promise<User | null>
    register: ({
                   email,
                   password,
                   username
               }: { email: string, password: string, username: string }) => Promise<User | null>
}

type JWT = {
    sub: number
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    token: null,
    login: async () => {
        return null
    },
    logout: () => {
    },
    register: async () => {
        return null
    }
})

const COOKIE_NAME = "mewo_reddit_auth"

export const useAuth = () => {
    return useContext(AuthContext);
}

const login = async ({
                         email,
                         password,
                     }: { email: string, password: string }): Promise<AuthContextProps['user']> => {
    const response = await apiLogin(email, password)

    if (!response) {
        return null;
    }

    window.sessionStorage.setItem(COOKIE_NAME, response.tokens.access.token)

    return response.user
}

const register = async ({
                            email,
                            password,
                            username
                        }: { email: string, password: string, username: string }): Promise<AuthContextProps['user']> => {
    const response = await apiRegister(email, password, username)

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
    const [mounted, setMounted] = useState(false)
    const token = window.sessionStorage.getItem(COOKIE_NAME)

    useEffect(() => {

        (async () => {
            if (token) {
                const user = await parseToken(token)
                setUser(user)
            }
            setMounted(true);
        })()
    }, [])

    const handleLogin = async ({email, password}: { email: string, password: string }) => {
        const user = await login({email, password})
        setUser(user)
        return user
    }

    const handleRegister = async ({
                                      email,
                                      password,
                                      username
                                  }: { email: string, password: string, username: string }) => {
        const user = await register({email, password, username})
        setUser(user)
        return user
    }

    const handleLogout = () => {
        logout()
        setUser(null)
    }

    if (!mounted) {
        return <div>loading</div>
    }


    return (
        <AuthContext.Provider
            value={{
                token,
                user: user,
                logout: handleLogout,
                login: handleLogin,
                register: handleRegister
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
