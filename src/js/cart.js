import { getLocalStorage } from "./utils.mjs";

// const cartFooter = document.querySelector(".cart-footer");

function renderCartContents() {
  const element = document.querySelector(".product-list");
  // element.remove();
  // console.log({childNodes: element.childNodes})
  console.log('@@@@@@')
  element.innerHTML = ""
  console.log({element});
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  element.innerHTML = htmlItems.join("");
  console.log({element2: element});
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

function calculateCartTotal() {
  const cartItems = getLocalStorage("so-cart"); // Move the declaration here
  let total = 0;
  for (const item of cartItems) {
    total += item.FinalPrice;
  }
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

renderCartContents();
