import {GET, POST} from "@/api/utils";
import {Comment, Post} from "@/interface/post";
import {User} from "@/interface/user";

export const getPosts = async (token: string): Promise<Post[] | null> => {
    const response = await GET(`/discussions`, token)

    if (response.code) {
        console.log(response)
        return null;
    }

    return response as Post[]
}

export const getPostById = async (postId: string, token: string): Promise<Post | null> => {
    const response = await GET(`/discussions/${postId}`, token)

    if (response.code) {
        console.log(response)
        return null;
    }

    return response as Post
}

export const getComments = async (postId: string, token: string): Promise<Comment[] | null> => {
    const comments = await GET(`/discussions/${postId}/comments`, token)

    return comments as Comment[]
}


export const createPost = async ({
                                     title,
                                     description,
                                     userIds
                                 }: { title: string, description: string, userIds: User['id'][] }, token: string) => {
    const response = await POST(`/discussions`, token, {
        title,
        description,
        userIds
    })

    if (response.code) {
        console.log(response)
        return null;
    }

    return response as Post[]
}

export const createComment = async ({
                                        postId,
                                        content,
                                    }: { postId: number, content: string }, token: string) => {
    const response = await POST(`/comments`, token, {
        content,
        discussionId: postId,
    })

    if (response.code) {
        console.log(response)
        return null;
    }

    return response as Post[]
}
