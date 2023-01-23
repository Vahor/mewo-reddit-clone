import React, {useEffect, useState} from "react";
import {useAuth} from "@/context/AuthContext";
import {getPosts} from "@/api/posts";
import {Post} from "@/interface/post";
import {Button} from "@/components/Button";
import {IconPlus} from "@tabler/icons";
import {CreatePostModal} from "@/components/Home/CreatePostModal";
import {PostCard} from "@/components/Home/PostCard";

const CreatePostButton = ({onCreate}: { onCreate: () => void }) => {
    const [createPostModalOpen, setCreatePropsModalOpen] = useState(false)

    const openModal = () => setCreatePropsModalOpen(true)
    const handleCreate = (create: boolean) => {
        setCreatePropsModalOpen(false)
        if (create)
            onCreate()
    }

    return (
        <div>
            <CreatePostModal open={createPostModalOpen} close={handleCreate}/>
            <Button onClick={openModal}>
                <div className="flex items-center gap-2">
                    <IconPlus size={16}/>
                    <p className='pb-0.5'>Create</p>
                </div>
            </Button>
        </div>
    )
}

export const HomePage = () => {
    const [posts, setPosts] = useState<Post[]>()
    const {token} = useAuth()

    const loadPosts = async () => {
        getPosts(token!).then((posts) => {
            if (posts) {
                setPosts(posts)
            }
        })
    }
    useEffect(() => {
        loadPosts()
    }, [token])

    return (
        <div className='flex flex-col'>
            <div className="flex justify-between">
                <div>
                    <h1 className='font-bold text-lg'>Latest Posts</h1>
                </div>
                <CreatePostButton onCreate={loadPosts}/>
            </div>
            <div className="mt-6 flex flex-col">
                {posts?.map((post) => (
                    <PostCard key={post.id} post={post}/>
                ))}
            </div>

        </div>
    )
}
