import {User} from "@/interface/user";
import {Tokens} from "@/interface/tokens";
import {POST} from "@/api/utils";

export const register = (name: string, email: string, password: string): null | {
    user: User
    tokens: Tokens
} => {
    console.error('TODO')
    return null
}


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
