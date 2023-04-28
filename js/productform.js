const urlPostProduct = 'http://localhost:8080/product'
console.log("jeg er i productform");
document.addEventListener('DOMContentLoaded', createFormEventListener);
let formProduct;

function createFormEventListener(){
    formProduct = document.getElementById("product-form");
    formProduct.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
    //Vi handler submitten her i stedet ofr default html behaviour
    event.preventDefault();
    const formData = new FormData(formProduct);
    console.log(formData);
    const jsonToPost = convertFormDataToJson(formData)
    console.log(jsonToPost)
    try {
        const responseData = await postFormDataAsJson(urlPostProduct, jsonToPost);
        console.log(responseData)
        //her kan man indsæt nyt product i tabellen
        actionFetchProducts()
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

function convertFormDataToJson(formData) {
    // laver formData til JSON
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);
    console.log(formDataJsonString);
    return formDataJsonString
}

async function postFormDataAsJson(url, jsonToSend) {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: jsonToSend,
    };
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    return response.json();
}

/// fill table with products

const urlGetProducts = 'http://localhost:8080/products'
const tableProduct = document.getElementById('product-list')

async function createProductTable(product) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.productId}</td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.weight}</td>
    `;
    tableProduct.appendChild(row);
}

let lstProducts = []
async function actionFetchProducts() {
    lstProducts = await fetchAny(urlGetProducts);
    tableProduct.innerHTML = '';
    lstProducts.forEach(createProductTable)
}


