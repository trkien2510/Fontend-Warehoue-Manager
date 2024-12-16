import { getToken } from "./TokenService";

export default async function updateUser(username, password, newPassword, email, newEmail) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const token = getToken();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({ username, password, newPassword, email, newEmail });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        credentials: 'include',
    };

    const response = await fetch("http://localhost:8080/api/users", requestOptions);
    const result = await response.json();
    console.log(result);
    return result;
}
