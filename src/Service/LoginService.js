export default async function login(username, password) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ username, password });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        credentials: 'include',
    };

    const response = await fetch("http://localhost:8080/api/auth/log-in", requestOptions);
    const result = await response.json();
    console.log(result);
    return result;
}
