import {GET, POST} from "@/api/utils";
import {Post} from "@/interface/post";
import {User} from "@/interface/user";

export const getPosts = async (token: string): Promise<Post[] | null> => {
    const response = await GET(`/discussions`, token)

    if (response.code) {
        console.log(response)
        return null;
    }

    return response as Post[]
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
