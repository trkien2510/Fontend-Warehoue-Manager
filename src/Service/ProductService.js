import { getToken } from "./TokenService";

export async function getProduct() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const token = getToken();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        credentials: 'include',
    };

    const response = await fetch("http://localhost:8080/api/products", requestOptions);
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }
    const result = await response.json();
    console.log(result)
    return result;
}

export async function createProduct( createNewProduct ) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const token = getToken();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
        name: createNewProduct.name,
        price: parseInt(createNewProduct.price),
        note: createNewProduct.note,
        quantity: parseInt(createNewProduct.quantity),
        category: parseInt(createNewProduct.category),
        supplier: parseInt(createNewProduct.supplier),
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        credentials: 'include',
    };

    const response = await fetch("http://localhost:8080/api/products", requestOptions);
    const result = await response.json();
    console.log(result)
    return result;
}

export async function updateProduct({ editedProduct }) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const token = getToken();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
        name: editedProduct.name,
        price: editedProduct.price,
        note: editedProduct.note,
        quantity: parseInt(editedProduct.quantity),
        category: editedProduct.category,
        supplier: editedProduct.supplier,
    });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        credentials: 'include',
    };

    const response = await fetch("http://localhost:8080/api/products", requestOptions);
    if (!response.ok) {
        throw new Error('Failed to update product');
    }
    const result = await response.json();
    console.log(result);
    return result;
}

export async function deleteProduct( product ) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const token = getToken();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
        name: product.name,
    });

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
        credentials: 'include',
    };

    const response = await fetch("http://localhost:8080/api/products", requestOptions);
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }
    const result = await response.json();
    console.log(result)
    return result;
}