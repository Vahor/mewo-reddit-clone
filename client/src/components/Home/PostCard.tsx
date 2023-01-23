import {Post} from "@/interface/post";
import {Link} from "react-router-dom";

export const PostCard = ({post}: { post: Post }) => {

    return (
        <Link to={`/post/${post.id}`}>
            <div className="px-2 py-4 border bg-white border-gray-300 dark:border-gray-800 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800">
                <p className='font-bold'>
                    {post.title}
                </p>
                <p>
                    {post.description}
                </p>
            </div>
        </Link>

    )
}
