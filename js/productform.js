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




