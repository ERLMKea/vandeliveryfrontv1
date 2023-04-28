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
}


