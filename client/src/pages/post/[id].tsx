import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {PostWithComments} from "@/interface/post";
import {getPostById} from "@/api/posts";
import {useAuth} from "@/context/AuthContext";
import {CreateCommentForm} from "@/components/Post/CreateCommentForm";

export const PostIdPage = () => {
    let {id} = useParams();

    const {token} = useAuth()
    const [post, setPost] = useState<PostWithComments | null>()

    const loadPost = async () => {
        if (!id) return
        getPostById(id, token!).then((post) => {
            setPost(post)
        })
    }
    useEffect(() => {
        loadPost()
    }, [token])

    if (post === undefined) {
        return <div>loading</div>
    }

    if (isNaN(Number(id)) || post === null) {
        return <div>Not Found</div>
    }

    return (
        <div className='flex gap-2 flex-col'>
            <div
                className="px-2 py-4 border bg-white border-gray-300 dark:border-gray-800 dark:bg-gray-900">
                <div className="flex flex-col gap-4">
                    <div>
                        <h1 className='text-2xl font-bold'>{post.title}</h1>
                        <p>
                            {post.description}
                        </p>
                    </div>

                    <div className='border-t border-gray-300 dark:border-gray-800 pt-4'>
                        <p className='text-sm'>Members: </p>
                        <div className="flex gap-2">
                            {post.users.map(user => (
                                <span>{user.name}</span>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
            <div
                className="px-2 py-4 border bg-white border-gray-300 dark:border-gray-800 dark:bg-gray-900">
                <h1 className='text-lg font-bold'>Comments</h1>
                <CreateCommentForm postId={Number(id)} onCreate={loadPost}/>
                {post.comments.length === 0 && <div>Empty</div>}
                {post.comments.map(comment => (
                    <div key={comment.id} className='flex flex-col gap-4 last:border-transparent border-b border-gray-300 dark:border-gray-800 py-4'>
                        <p>
                            {comment.content}
                        </p>
                        <p className='text-sm'>From: {comment.user.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
