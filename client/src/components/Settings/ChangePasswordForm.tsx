import React, {FormEvent, useState} from "react";
import {Button} from "../Button";
import {changePassword} from "@/api/users";
import {useAuth} from "@/context/AuthContext";

export const ChangePasswordForm = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const passwordMatch = newPassword === confirmPassword || (newPassword.length === 0 && confirmPassword.length === 0)

    const {user, token} = useAuth();

    const handleSubmit = async (event: FormEvent) => {
        if (loading || !passwordMatch) return

        event.preventDefault()

        setLoading(true)
        setError(null)

        changePassword(user!.id, newPassword, token!).then((res) => {
            if (res) {
                setError(res.message)
            } else {
                alert('Password changed successfully')
            }
        }).finally(() => {
            setLoading(false)
        })
    }


    return (
        <>
            <h2 className='font-bold'>
                Change password
            </h2>

            <p className='text-red-400  mt-4'>
                {error}
            </p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="new-password">
                        New password
                    </label>
                    <input
                        id="new-password"
                        name="new-password"
                        type="password"
                        required
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="confirm-password">
                        Confirm password
                    </label>
                    <input
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        required
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`relative block w-full appearance-none rounded-md border ${passwordMatch ? 'border-gray-300' : 'border-red-300'} px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
                    />
                </div>
                <div className="w-max ml-auto mt-4">
                    <Button type="submit" disabled={!passwordMatch || loading || newPassword.length === 0}>
                        Change password
                    </Button>
                </div>
            </form>
        </>
    )
}
