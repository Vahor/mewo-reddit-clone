import {CreateCommentForm} from "@/components/Post/CreateCommentForm";
import {CommentCard} from "@/components/Post/CommentCard";
import React, {useEffect, useState} from "react";
import {useAuth} from "@/context/AuthContext";
import {getComments} from "@/api/posts";
import {Comment} from "@/interface/post";

export const CommentsArea = ({postId}: { postId: string }) => {

    const {token} = useAuth()
    const [comments, setComments] = useState<Comment[]>(() => [])

    const loadComments = async () => {
        if (!postId || !token) return
        getComments(postId, token).then((comments) => setComments(comments ?? []))
    }

    useEffect(() => {
        loadComments()

        const timeout = setInterval(() => {
            loadComments()
        }, 5_000);

        return () => {
            clearInterval(timeout)
        }
    }, [token, postId])

    return (
        <div
            className="px-2 py-4 border bg-white border-gray-300 dark:border-gray-800 dark:bg-gray-900">
            <h1 className='text-lg font-bold'>Comments</h1>
            <CreateCommentForm postId={Number(postId)} onCreate={loadComments}/>
            {comments.length === 0 && <div>Empty</div>}
            <section id="comments" className="pt-4">
                {[...comments].reverse().map(comment => <CommentCard key={comment.id} comment={comment}/>)}
            </section>
        </div>
    )
}
