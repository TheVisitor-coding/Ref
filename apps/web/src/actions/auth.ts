'use server'

export async function signup(username: string, email: string, password: string) {
    const api_url = process.env.NEXT_PUBLIC_STRAPI_URL + "/api/auth/local/register"
    
    if (!process.env.NEXT_PUBLIC_STRAPI_URL) {
        throw new Error("API URL is not defined")
    }

    const res = await fetch(api_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
    })

    if (!res.ok) {
        throw new Error("Failed to register", { cause: await res.text() })
    }

    const data = await res.json()

    return data
}