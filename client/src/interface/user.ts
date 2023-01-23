export type User = {
    id: string
    name: string;
    username: string;
    role: 'user' | 'admin'
    isEmailVerified: boolean | undefined
}
