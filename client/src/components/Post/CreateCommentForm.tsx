import {Button} from "@/components/Button";
import React, {FormEvent, useState} from "react";
import {useAuth} from "@/context/AuthContext";
import {createComment} from "@/api/posts";

type CreateCommentFormProps = {
    onCreate: () => void
    postId: number
}

export const CreateCommentForm = ({postId, onCreate}: CreateCommentFormProps) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const {token} = useAuth()

    const [content, setContent] = useState<string>('')

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        setLoading(true)
        setError(false)
        if (content.trim().length === 0) {
            setError(true)
            setLoading(false)
        } else {
            createComment({
                postId,
                content,
            }, token!)
                .then(() => {
                    setError(false)
                    setLoading(false)
                    setContent('')
                    onCreate()
                })
                .catch(() => setError(true))
        }
    }


    return (
        <div>
            <p className='text-red-400'>
                {error && 'Invalid fields'}
            </p>
            <form className='flex flex-col gap-2' onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="content" className='dark:text-gray-200 text-gray-800 text-sm'>
                        Add comment
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        required
                        className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                        placeholder="Comment"
                        disabled={loading}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <div className="w-min ml-auto">
                    <Button>
                        Send
                    </Button>
                </div>
            </form>
        </div>
    )
}
