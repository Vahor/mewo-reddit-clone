import {User} from "@/interface/user";

export type Post = {
    id: string
    title: string
    description: string
    users: User[]
}

export type Comment = {
    id: string
    content: string
    user: Pick<User, 'id' | 'name'>
}
