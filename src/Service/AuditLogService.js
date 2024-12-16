import { getToken } from "./TokenService";

export async function getAuditlog() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const token = getToken();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        credentials: 'include',
    };

    const response = await fetch("http://localhost:8080/api/audit-log", requestOptions);
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }
    const result = await response.json();
    console.log(result)
    return result;
}

export async function createAuditlog( action ) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const token = getToken();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({ action });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        credentials: 'include',
    };

    const response = await fetch("http://localhost:8080/api/audit-log", requestOptions);
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }
    const result = await response.json();
    console.log(result)
    return result;
}