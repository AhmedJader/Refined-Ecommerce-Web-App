function getProduct() {
    const productvalue = document.getElementById('product').value;
    const productURL = `https://fakestoreapi.com/products/${productvalue}`;
    
    fetch(productURL)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Product not found');
            }
            return res.json();
        })
        .then((json) => displayProduct(json))
        .catch((error) => {
            console.error('Error fetching product:', error.message);
            displayProductError(error.message);
        });
}//getProduct ends

function displayProduct(data) {
    const catDivInfo = document.getElementById('category-div');
    const desDivInfo = document.getElementById('description-div');
    const imgDivInfo = document.getElementById('image-div');
    const priceDivInfo = document.getElementById('price-div');
    const titleDivInfo = document.getElementById('title-div');

    // Clear previous content when the user submits the form multiple times
    catDivInfo.innerHTML = '';
    desDivInfo.innerHTML = '';
    priceDivInfo.innerHTML = '';
    titleDivInfo.innerHTML = '';
    imgDivInfo.innerHTML = '';

    // Show the content 
    catDivInfo.innerHTML = `<p>Category: ${data.category}</p>`;
    desDivInfo.innerHTML = `<p>Description: ${data.description}</p>`;
    priceDivInfo.innerHTML = `<p>Price: $${data.price}</p>`;
    titleDivInfo.innerHTML = `<h3>${data.title}</h3>`;
    imgDivInfo.innerHTML = `<img src='${data.image}' alt="Image product">`;

    imgDivInfo.style.display = 'block'; // Make the image visible
}//display product ends


function displayProductError(errorMessage) {
    const titleDivInfo = document.getElementById('title-div');
    titleDivInfo.innerHTML = `<p>${errorMessage}</p>`;
}//displays a error message 