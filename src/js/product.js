import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// add product to the cart in localStorage
function addProductToCart(product) {
  let activeCart = JSON.parse(localStorage.getItem("so-cart")) || [];
  activeCart.push(product);
  setLocalStorage("so-cart", activeCart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
