import {ApiError} from "@/interface/error";

export const GET = async <T extends Record<string, any>>(path: string, token?: string): Promise<ApiError | T> => {
    const response = await fetch(`/api${path}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    })

    if (response.status !== 200 && response.status !== 201 && response.status !== 304) {
        return await response.json() as ApiError;
    }

    return await response.json() as T;
}

export const POST = async <T extends Record<string, any>>(path: string, token: string | null, body: Record<string, any>): Promise<ApiError | T> => {
    const response = await fetch(`/api${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(body)
    })

    if (response.status === 204) {
        return {} as T;
    }

    if (response.status !== 200 && response.status !== 201) {
        return await response.json() as ApiError;
    }

    return await response.json() as T;
}



