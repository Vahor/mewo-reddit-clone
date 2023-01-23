import React, {FormEvent, useState} from "react";
import {Button} from "../components/Button";
import {useAuth} from "../context/AuthContext";
import {useHistory} from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {user, login} = useAuth()
    const history = useHistory()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        setLoading(true)
        setError(false)
        login({username, password})
            .then((user) => {
                if (!user) {
                    setError(true)
                }
                setLoading(false)
            })
    }

    if (user) {
        history.replace('/')
        return null
    }

    return (
        <div className='h-screen flex justify-center flex-col'>
            <h1 className='text-6xl font-bold mb-4'>
                Login
            </h1>
            <p className='text-red-400'>
                {error && 'Wrong username or password'}
            </p>
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email-address" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="text"
                        required
                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Username"
                        disabled={loading}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                        placeholder="Password"
                        disabled={loading}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button type='submit' disabled={loading}>
                    Envoyer
                </Button>
            </form>
        </div>
    )
}

export default LoginPage
