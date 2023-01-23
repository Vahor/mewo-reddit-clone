import {User} from "@/interface/user";
import {GET} from "@/api/utils";

export const getPosts = async (token: string): Promise<User | null> => {
    const response = await GET(`/discussions`, token)

    if (response.code) {
        console.log(response)
        return null;
    }

    return response as User
}
