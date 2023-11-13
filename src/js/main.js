import productData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { setLocalStorage } from "./utils.mjs";
import Alert from "./Alert";

const productDataInstance = new productData("tents");
const element = document.querySelector(".product-list");
const productList = new ProductListing("Tents", productDataInstance, element);
productList.init();

new Alert();

export function updateIcon() {
  let activeCart = JSON.parse(localStorage.getItem("so-cart")) || [];
  setLocalStorage("so-cart", activeCart);

  const cartCount = document.getElementById("cart-count");
  let count = activeCart.length;
  cartCount.innerHTML = count;

  if (count == 0) {
    cartCount.style.display = "none";
  } else {
    cartCount.style.display = "block";
  }
}
updateIcon();
