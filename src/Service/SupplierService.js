import { getToken } from "./TokenService";

export async function getSupplier() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const token = getToken();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        credentials: 'include',
    };

    const response = await fetch("http://localhost:8080/api/supplier", requestOptions);
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }
    const result = await response.json();
    return result;
}

export async function createSupplier(name, contactInfo) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const token = getToken();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({name, contactInfo});

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        credentials: 'include',
    };

    const response = await fetch("http://localhost:8080/api/supplier", requestOptions);
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }
    const result = await response.json();
    return result;
}

export async function deleteSupplier(name) {
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

    const response = await fetch("http://localhost:8080/api/supplier", requestOptions);
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }
    const result = await response.json();
    return result;
}