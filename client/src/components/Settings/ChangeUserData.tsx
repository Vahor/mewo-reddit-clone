import React, {FormEvent, useState} from "react";
import {Button} from "../Button";
import {changeUserInfo} from "@/api/users";
import {useAuth} from "@/context/AuthContext";

export const ChangeUserData = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const {user, token, logout} = useAuth();

    const [email, setEmail] = useState(user!.email)
    const [name, setName] = useState(user!.name)

    const hasChanged = email !== user?.email || name !== user.name;

    const handleSubmit = async (event: FormEvent) => {
        if (loading || !hasChanged) return
        event.preventDefault()

        setLoading(true)
        setError(null)

        changeUserInfo(user!.id, {
            email,
            name
        }, token!).then((res) => {
            if (res) {
                setError(res.message)
            } else {
                alert('Password changed successfully')
                setEmail('')
                setName('')
                logout()
            }
        }).finally(() => {
            setLoading(false)
        })
    }


    return (
        <>
            <h2 className='font-bold'>
                Change information
            </h2>

            <p className='text-red-400  mt-4'>
                {error}
            </p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="new-email">
                        Email
                    </label>
                    <input
                        id="new-email"
                        name="new-email"
                        type="text"
                        required
                        placeholder="New email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="confirm-password">
                        Name
                    </label>
                    <input
                        id="new-name"
                        name="new-name"
                        type="text"
                        required
                        placeholder="New name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    />
                </div>
                <div className="w-max ml-auto mt-4">
                    <Button type="submit" disabled={!hasChanged || loading}>
                        Send
                    </Button>
                </div>
            </form>
        </>
    )
}
