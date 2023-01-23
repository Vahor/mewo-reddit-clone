import type {FeedResponse} from "../interface/api";
import dayjs from "dayjs";
import {Link} from "react-router-dom";
import {
    IconChevronDown,
    IconHeart,
    IconMessage,
    IconMessage2,
    IconMessages,
    IconShare,
    IconSwitch, IconUpload
} from "@tabler/icons";

type PostProps = {
    post: FeedResponse[number]
}

const PostBody = ({post}: PostProps) => (
    <>
        <div className="flex justify-between items-center">
            <div className='flex col-span items-start gap-2'>
                <div className="flex gap-1 items-center">
                    <Link to={`/user/${post.user.name}`} className="flex gap-1 items-center">
                        <span className='font-bold'>{post.user.name}</span>
                        <span className='text-xs text-gray-300'>@{post.user.username}</span>
                    </Link>
                    <span className='text-xs text-gray-300'>&nbsp;-&nbsp;{dayjs(post.createdAt).fromNow()}</span>
                </div>
            </div>
            <div className="">
                <IconChevronDown size={16} className='text-gray-300'/>
            </div>
        </div>
        <div className='pb-4'>
            {post.body}
        </div>
    </>

)

const PostSignature = ({post}: PostProps) => (
    <div className='flex justify-between max-w-[50%] text-gray-300'>
        <IconMessages size={18}/>
        <IconSwitch size={18}/>
        <IconHeart size={18}/>
        <IconUpload size={18}/>
    </div>
)


const Post = ({post}: PostProps) => {

    return (
        <div id={`post-${post.id}`}>
            <div className="grid grid-cols-8 py-1">
                <div className="col-span-1 py-1.5">
                    <Link to={`/user/${post.user.name}`}>
                        <img
                            className="h-10 w-10 rounded-full mx-auto"
                            src={post.user.profilePicture}
                            alt={post.user.username}/>
                    </Link>
                </div>
                <div className="col-span-7">
                    <PostBody post={post}/>
                    <PostSignature post={post}/>
                </div>
            </div>
        </div>
    )
}

export default Post;
