const urlGetProductOrders = 'http://localhost:8080/productorders'
const urlGetProducts = 'http://localhost:8080/products'
const urlPostProductOrder = 'http://localhost:8080/order'

console.log("jeg er i productorderform");
document.addEventListener('DOMContentLoaded', createFormEventListener);
let formProductOrder;

function createFormEventListener(){
    formProductOrder = document.getElementById("productorder-form");
    formProductOrder.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
    //Vi handler submitten her i stedet ofr default html behaviour
    event.preventDefault();
    const formData = new FormData(formProductOrder);
    console.log(formData);
    const jsonToPost = convertFormDataToJson(formData)
    console.log(jsonToPost)
    try {
        const responseData = await postFormDataAsJson(urlPostProductOrder, jsonToPost);
        console.log(responseData)
        //her kan man indsæt nyt product i tabellen
        //actionFetchProducts()
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

function convertFormDataToJson(formData) {
    // laver formData til JSON
    const plainFormData = Object.fromEntries(formData.entries());
    const productId = plainFormData.product
    plainFormData.product = {}
    plainFormData.product.productId = productId
    plainFormData.delivery = {}
    plainFormData.delivery.deliveryId = 1
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
    console.log("kald url=" + url)
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    return response.json();
}


/////  handle ddProducts
const ddProducts = document.getElementById('ddProducts')

async function actionFetchProducts() {
    lstProducts = await fetchAny(urlGetProducts);
    console.log(lstProducts)
    lstProducts.forEach(fillProductsDropDown)
}

function fillProductsDropDown(product) {
    //console.log(kom)
    const el = document.createElement("option")
    el.textContent = product.name
    el.value = product.productId
    el.region = product
    ddProducts.appendChild(el)
}

actionFetchProducts();

