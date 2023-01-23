import {User} from "@/interface/user";

export type Post = {
    id: string
    title: string
    description: string
    comments: Comment[] | undefined
}

type Comment = {
    id: string
    comment: string
    user: Pick<User, 'id' | 'name'>
}
