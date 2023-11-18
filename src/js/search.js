import { searchProducts } from "./utils.mjs";

// Send a GET request to the API with the search query
  fetch(`http://server-nodejs.cit.byui.edu:3000/products/search/${searchProducts}`)
    .then((response) => response.json())
    .then((data) => {
      // Display the search results on the product list page
      const productList = document.querySelector(".product-grid");
      productList.innerHTML = "";

      data.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <img src="${product.image}" alt="${product.name}">
          `;

        productList.appendChild(productElement);
      });
    });


