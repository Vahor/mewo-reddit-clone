import {Button} from "@/components/Button";
import {Link} from "react-router-dom";
import React, {FormEvent, useState} from "react";
import {useAuth} from "@/context/AuthContext";
import {ApiError} from "@/interface/error";

export const RegisterForm = () => {
    const [username, setUsername] = useState<string>('fake')
    const [email, setEmail] = useState<string>('fake@example.com')
    const [password, setPassword] = useState<string>('password1')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const {register} = useAuth()

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        setLoading(true)
        setError(null)
        register({email, password, username})
            .catch((error: ApiError) => {
                setError(error.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <>
            <p className='text-red-400'>
                {error}
            </p>
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username" className="sr-only">
                        Username
                    </label>
                    <input
                        id="username"
                        name="username"
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
                    <label htmlFor="email-address" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="text"
                        required
                        className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Username"
                        disabled={loading}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <div className="mt-2">
                    <Button type='submit' disabled={loading}>
                        Send
                    </Button>
                    <div>
                        <Link to='/auth/login'>
                            Login
                        </Link>
                    </div>
                </div>
            </form>
        </>
    )
}
