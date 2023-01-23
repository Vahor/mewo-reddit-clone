import {User} from "@/interface/user";

export type Post = {
    id: string
    title: string
    description: string
    comments: Comment[]
}

type Comment = {
    id: string
    comment: string
    user: Pick<User, 'id' | 'name'>
}
