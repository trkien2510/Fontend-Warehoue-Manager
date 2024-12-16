export default async function register(username, password, email) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ username, password, email });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        credentials: 'include',
    };

    const response = await fetch("http://localhost:8080/api/users", requestOptions);
    const result = await response.json();
    console.log(result);
    return result;
};
