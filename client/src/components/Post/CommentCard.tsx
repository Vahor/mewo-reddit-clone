import React from "react";
import type {Comment} from "@/interface/post"

export const CommentCard: React.FC<{ comment: Comment }> = ({comment}) => (
    <div id={`post-${comment.id}`} className='border-b dark:border-gray-800 last:border-transparent py-2'>
        <div className="grid grid-cols-9 py-1">
            <div className="col-span-1 py-1.5">
                <img
                    className="h-10 w-10 rounded-full mx-auto"
                    src={`https://api.dicebear.com/5.x/bottts/svg?seed=${comment.user.id}`}
                    alt={comment.user.name}/>
            </div>
            <div className="col-span-8">
                <div className='pb-4'>
                    {comment.content}
                </div>
                <div className='text-gray-400 text-sm'>
                    From: {comment.user.name}
                </div>
            </div>
        </div>
    </div>
)
