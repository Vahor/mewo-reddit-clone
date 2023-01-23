import {useEffect, useState} from "react";
import {useAuth} from "@/context/AuthContext";
import {createPost, getPosts} from "@/api/posts";
import {Post} from "@/interface/post";
import {User} from "@/interface/user";
import {getAllUsers} from "@/api/users";

export const HomePage = () => {
    const [post, setPosts] = useState<Post[]>()
    const [users, setUsers] = useState<User[]>()
    const {token, user} = useAuth()

    useEffect(() => {
        getPosts(token!).then((posts) => {
            if (posts) {
                setPosts(posts)
            }
        })

        getAllUsers(token!).then((users) => {
            if(users) {
                setUsers(users)
            }
        })
    }, [token])

    const test = () => {
        createPost({
            title: Math.random() + 'title',
            description: 'ldldldldl',
            userIds: users!.map(user => user.id).filter(id => id !== user!.id)
        }, token!)
    }

    return (
        <div>
            HomePage
            <pre>
                {JSON.stringify(post, null, 2)}
            </pre>
            <pre>
                {JSON.stringify(token, null, 2)}
            </pre>
            <pre>
                {JSON.stringify(users, null, 2)}
            </pre>
            <button
            onClick={test}>
                create post
            </button>
        </div>
    )
}
