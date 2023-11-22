import { getLocalStorage, updateIcon } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.product.Images.PrimaryMedium}" alt="${item.product.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.product.Name}</h2>
    </a>
    <p class="cart-card__color">${item.product.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">
      qty: <span class="quantity">${item.quantity}</span>
      <button class="quantity-btn" data-action="decrement" data-id="${item.product.Id}">-</button>
      <button class="quantity-btn" data-action="increment" data-id="${item.product.Id}">+</button>
    </p>
    <p class="cart-card__price">$${item.product.FinalPrice}</p>
  </li>`;

  return newItem;
}

function calculateCartTotal() {
  const cartItems = getLocalStorage("so-cart");
  let total = 0;
  for (const item of cartItems) {
    total += item.product.FinalPrice * item.quantity;
  }
  return total;
}

export function updateCartTotal() {
  const cartFooterElement = document.querySelector(".cart-footer");
  const cartTotal = calculateCartTotal();

  if (cartTotal > 0) {
    cartFooterElement.classList.add("has-total");
    cartFooterElement.innerHTML = `<p class="cart-total">Total: $${cartTotal.toFixed(2)}</p>`;
  } else {
    cartFooterElement.classList.remove("has-total");
    cartFooterElement.innerHTML = "";
  }
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("quantity-btn")) {
    const action = event.target.dataset.action;
    const productId = event.target.dataset.id;
    updateCartItemQuantity(productId, action);
  }
  updateIcon();
});

function updateCartItemQuantity(productId, action) {
  const cartItems = getLocalStorage("so-cart");
  const updatedCartItems = cartItems.map((item) => {
    if (item.product.Id === productId) {
      if (action === "increment") {
        item.quantity += 1;
      } else if (action === "decrement" && item.quantity > 1) {
        item.quantity -= 1;
      }
    }
    return item;
  });

  // Update local storage with the updated cart items
  localStorage.setItem("so-cart", JSON.stringify(updatedCartItems));

  // Render the updated cart
  const shoppingCart = new ShoppingCart("so-cart", ".product-list");
  shoppingCart.renderCartContents();

  // Update the cart total
  updateCartTotal();
}
 
  
export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.total = 0;
  }
  async init(){
    const list = getLocalStorage(this.key);
    this.calculateListTotal(list);
    this.renderCartContents(list);
  }
  calculateListTotal(list){
    const amounts = list.map((item) => item.FinalPrice);
    this.total = amounts.reduce((sum, item) => sum + item);
  }
  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
    document.querySelector(".cart-total").innerText += `$${this.total}`;
  }
}