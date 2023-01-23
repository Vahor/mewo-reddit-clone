export type Token = {
    token: string
    expires: string
}
export type Tokens = {
    access: Token,
    refresh: Token
}
