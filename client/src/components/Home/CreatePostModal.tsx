import {Button} from "@/components/Button";
import React, {FormEvent, useEffect, useState} from "react";
import {useAuth} from "@/context/AuthContext";
import {createPost} from "@/api/posts";
import {User} from "@/interface/user";
import {getAllUsers} from "@/api/users";

type CreatePostModalProps = {
    onCreate?: () => void
    open: boolean
    close?: (create: boolean) => void
}

export const CreatePostModal = ({open, close}: CreatePostModalProps) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const {token, user} = useAuth()
    const [users, setUsers] = useState<User[]>()


    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [userIds, setUserIds] = useState<User['id'][]>([])

    useEffect(() => {
        getAllUsers(token!).then((users) => {
            if (users) {
                setUsers(users.filter(u => u.id !== user!.id))
            }
        })
    }, [token, user!.id])

    if (!open) {
        return null;
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        setLoading(true)
        setError(false)
        if (userIds.length === 0 || title.trim().length === 0 || description.trim().length === 0) {
            setError(true)
            setLoading(false)
        } else {
            createPost({
                title,
                description,
                userIds,
            }, token!)
                .then(() => {
                    setError(false)
                    setLoading(false)
                    close?.(true)
                })
                .catch(() => setError(true))
        }
    }


    return (
        <div className='absolute inset-0 bg-gray-900/20 backdrop-blur'>
            <div className="z-1 inset-0 absolute" onClick={() => close?.(false)}></div>
            <div className="z-[10] max-w-md m-auto relative bg-white dark:bg-gray-800 rounded-md w-full mt-16 p-8">
                <p className='font-bold text-g dark:text-white'>Create Post</p>
                <p className='text-red-400'>
                    {error && 'Invalid fields'}
                </p>
                <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="password" className='dark:text-gray-200 text-gray-800 text-sm'>
                            Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            required
                            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                            placeholder="Title"
                            disabled={loading}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className='dark:text-gray-200 text-gray-800 text-sm'>
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            required
                            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                            placeholder="Description"
                            disabled={loading}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className='dark:text-gray-200 text-gray-800 text-sm'>
                            Users
                        </label>
                        <select
                            id="description"
                            name="description"
                            multiple
                            required
                            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                            placeholder="Description"
                            disabled={loading}
                            value={userIds}
                            onChange={(e) => {
                                setUserIds(Array.from(e.target.selectedOptions, option => option.value))
                            }}
                        >
                            {users?.map(user => (
                                <option value={user.id} key={user.id}>{user.name} ({user.id})</option>
                            ))}
                        </select>

                    </div>


                    <div className="w-min ml-auto">
                        <Button>
                            Send
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
