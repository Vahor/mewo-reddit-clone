export const GET = async <T, >(path: string, token?: string): Promise<T> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${path}`)
    const data = await response.json() as T;

    return data;
}

export const POST = async <T, >(path: string, token: string, body: Record<string, any>): Promise<T> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authentication': 'Bearer ' + token
        },
        body: JSON.stringify(body)
    })
    const data = await response.json() as T;

    return data;
}



