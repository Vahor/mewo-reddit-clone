import {useEffect, useState} from "react";
import {useAuth} from "@/context/AuthContext";
import {getPosts} from "@/api/posts";

export const HomePage = () => {
    const [post, setPosts] = useState()
    const {token} = useAuth()

    useEffect(() => {
        getPosts(token!).then((posts) => {
            // setPosts(posts)
        })
    }, [token])

    return (
        <div>
            HomePage
            <pre>
                {JSON.stringify(post, null, 2)}
            </pre>
            <pre>
                {JSON.stringify(token, null, 2)}
            </pre>
        </div>
    )
}
