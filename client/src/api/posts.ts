import {GET, POST} from "@/api/utils";
import {Post, PostWithComments} from "@/interface/post";
import {User} from "@/interface/user";

export const getPosts = async (token: string): Promise<Post[] | null> => {
    const response = await GET(`/discussions`, token)

    if (response.code) {
        console.log(response)
        return null;
    }

    return response as Post[]
}

export const getPostById = async (postId: string, token: string): Promise<PostWithComments | null> => {
    const response = await GET(`/discussions/${postId}`, token)

    if (response.code) {
        console.log(response)
        return null;
    }
    const responseComments = await GET(`/discussions/${postId}/comments`, token)


    const post = response as PostWithComments;
    if (responseComments.code) {
        post.comments = []
    } else {
        post.comments = responseComments as PostWithComments['comments'];
    }

    return post
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
