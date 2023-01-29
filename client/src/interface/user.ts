export type User = {
    id: string
    name: string;
    role: 'user' | 'admin'
    isEmailVerified: boolean | undefined
}
