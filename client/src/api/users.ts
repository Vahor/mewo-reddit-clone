import {User} from "@/interface/user";
import {GET} from "@/api/utils";

export const getCurrentUser = async ( token: string): Promise<User | null> => {
    const response = await GET(`/auth/user`, token)

    if (response.code) {
        console.log(response)
        return null;
    }

    return response as User
}

export const getUserById = async (id: number, token: string): Promise<User | null> => {
    const response = await GET(`/users/${id}`, token)

    if (response.code) {
        console.log(response)
        return null;
    }

    return response as User
}

export const getAllUsers = async (token: string): Promise<User[] | null> => {
    const response = await GET(`/users`, token)

    if (response.code) {
        console.log(response)
        return null;
    }

    return response as User[]
}
