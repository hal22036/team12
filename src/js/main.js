import { setLocalStorage } from "./utils.mjs";

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
