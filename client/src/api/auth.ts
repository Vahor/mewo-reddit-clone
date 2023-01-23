import {User} from "../interface/user";
import {Tokens} from "../interface/tokens";

export const register = (name: string, email: string, password: string): null | {
    user: User
    tokens: Tokens
} => {
    return null
}


export const login = (email: string, password: string): null | {
    user: User
    tokens: Tokens
} => {
    return null
}
