import {User} from "@/interface/user";
import {Tokens} from "@/interface/tokens";
import {POST} from "@/api/utils";

type LoginResponse = {
    user: User
    tokens: Tokens
}
export const login = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await POST('/auth/login', null, {
        email,
        password
    })

    if (response.code) {
        throw new Error(response.message)
    }

    return response as LoginResponse
}

export const logout = async (refresh_token: string): Promise<void> => {
    await POST('/auth/logout', null, {
        refreshToken: refresh_token,
    });
}

export const register = async (email: string, password: string, username: string): Promise<LoginResponse> => {
    const response = await POST('/auth/register', null, {
        name: username,
        email,
        password
    })

    if (response.code) {
        throw new Error(response.message)
    }

    return response as LoginResponse;
}

