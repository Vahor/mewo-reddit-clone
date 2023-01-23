import {User} from "@/interface/user";
import {GET} from "@/api/utils";

export const getUserById = async (id: number, token: string): Promise<User | null> => {
    const response = await GET(`/users/${id}`, token)

    if (response.code) {
        console.log(response)
        return null;
    }

    return response as User
}
