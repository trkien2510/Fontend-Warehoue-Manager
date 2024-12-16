import { getToken } from "./TokenService";

export async function getCategory() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const token = getToken();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        credentials: 'include',
    };

    const response = await fetch("http://localhost:8080/api/category", requestOptions);
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }
    const result = await response.json();
    console.log(result)
    return result;
}


export async function createCategory(name) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const token = getToken();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({name});

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        credentials: 'include',
    };

    const response = await fetch("http://localhost:8080/api/category", requestOptions);
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }
    const result = await response.json();
    console.log(result)
    return result;
}

export async function deleteCategory(name) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const token = getToken();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({name});

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
        credentials: 'include',
    };

    const response = await fetch("http://localhost:8080/api/category", requestOptions);
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }
    const result = await response.json();
    console.log(result)
    return result;
}
