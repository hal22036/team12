import { getLocalStorage } from "./utils.mjs";

// loadHeaderFooter();

  
  function cartItemTemplate(item) {
    console.log({item})
    const newItem = `<li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.product.Images.PrimaryMedium}" alt="${item.product.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.product.Name}</h2>
      </a>
      <p class="cart-card__color">${item.product.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: ${item.quantity}</p>
      <p class="cart-card__price">$${item.product.FinalPrice}</p>
    </li>`;
  
    return newItem;
  }
  
  function calculateCartTotal() {
    const cartItems = getLocalStorage("so-cart"); // Move the declaration here
    let total = 0;
    for (const item of cartItems) {
      console.log({item})
      total += item.product.FinalPrice;
    }
    console.log({total})
    return total;
  }
  
  function updateCartTotal(total) {
    const cartFooterElement = document.querySelector(".cart-footer");
  
    if (total > 0) {
      cartFooterElement.classList.add("has-total");
      cartFooterElement.innerHTML = `<p class="cart-total">Total:$${total}</p>`;
    } else {
      cartFooterElement.classList.remove("has-total");
      cartFooterElement.innerHTML = ""; // Clear content when total is 0
    }
  }
  
  const cartTotal = calculateCartTotal(); // Remove the global declaration of cartItems
  updateCartTotal(cartTotal);
  
 
  
export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }
 renderCartContents() {
    const cartItems = getLocalStorage("so-cart");
    console.log({cartItems});
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  }
}