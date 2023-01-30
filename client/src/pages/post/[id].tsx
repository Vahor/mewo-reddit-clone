import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {type PostWithComments} from "@/interface/post";
import {getPostById} from "@/api/posts";
import {useAuth} from "@/context/AuthContext";
import {CreateCommentForm} from "@/components/Post/CreateCommentForm";
import {CommentCard} from "@/components/Post/CommentCard";

export const PostIdPage = () => {
    let {id} = useParams();

    const {token} = useAuth()
    const [post, setPost] = useState<PostWithComments | null>()

    const loadPost = async () => {
        if (!id || !token) return
        getPostById(id, token!).then((post) => {
            setPost(post)
        })
    }
    useEffect(() => {
        loadPost()

        const timeout = setInterval(() => {
            loadPost()
        }, 5_000);

        return () => {
            clearInterval(timeout)
        }
    }, [token, id])

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
                                <span key={user.id}>{user.name}</span>
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
                <section id="comments" className="pt-4">
                    {[...post.comments].reverse().map(comment => <CommentCard key={comment.id} comment={comment}/>)}
                </section>
            </div>
        </div>
    )
}
