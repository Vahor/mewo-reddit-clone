import {User} from "@/interface/user";
import {Tokens} from "@/interface/tokens";
import {POST} from "@/api/utils";

type LoginResponse = {
    user: User
    tokens: Tokens
}
export const login = async (email: string, password: string): Promise<null | LoginResponse> => {
    const response = await POST('/auth/login', null, {
        email,
        password
    })
    if (response.code) {
        console.log(response)
        return null;
    }

    return response as LoginResponse
}

export const register = async (email: string, password: string, username: string,): Promise<null | LoginResponse> => {
    const response = await POST('/auth/register', null, {
        name: username,
        email,
        password
    })

    if (response.code) {
        console.log(response)
        return null;
    }

    return response as LoginResponse
}
