const loader = document.getElementById("loader");
loader.classList.remove("loader");

function onButtonClick() {
    loader.classList.add("loader");
    // Show the loader when the button is clicked
    loader.classList.remove("loader--hidden");

    // Call the getProduct function
    getProduct();
}

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
        .then((json) => {
            displayProduct(json);
        })
        .catch((error) => {
            console.error('Error fetching product:', error.message);
            displayProductError(error.message);
        })
        .finally(() => {
            // Use setTimeout to delay hiding the loader for a specific duration
            setTimeout(() => {
                loader.classList.add("loader--hidden");
            }, 1000); // Adjust the duration (in milliseconds) as needed
        });
}



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