import React from "react";
import type {Comment} from "@/interface/post"

export const CommentCard: React.FC<{ comment: Comment }> = ({comment}) => (
    <div className='flex flex-col gap-4 last:border-transparent border-b border-gray-300 dark:border-gray-800 py-4'>
        <p>
            {comment.content}
        </p>
        <p className='text-sm'>From: {comment.user.name}</p>
    </div>
)
