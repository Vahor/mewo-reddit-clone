import {User} from "@/interface/user";
import {GET, PATCH} from "@/api/utils";
import {ApiError} from "@/interface/error";

export const getCurrentUser = async (token: string): Promise<User | null> => {
    const response = await GET(`/auth/user`, token)

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

export const changePassword = async (userId: string, newPassword: string, token: string): Promise<ApiError | void> => {
    const response = await PATCH(`/users/${userId}`, token, {
        password: newPassword
    })

    if (response.code) {
        return response as ApiError;
    }
}

export const changeUserInfo = async (userId: string, userData: Partial<Pick<User, 'email' | 'name'>>, token: string): Promise<ApiError | void> => {
    const response = await PATCH(`/users/${userId}`, token, {
        ...userData
    })

    if (response.code) {
        return response as ApiError;
    }
}
