export async function apiCall(method, route, body, token) {
    const response = await (await fetch(`/api${route}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: token && `Bearer ${token}`
        },
        body: body && JSON.stringify(body)
    }))
    .json();

    return response;
}