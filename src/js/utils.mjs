// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  const localStorageData = localStorage.getItem(key);

  return localStorageData != null ? JSON.parse(localStorageData) : [];
}
// save data to local storage
export function setLocalStorage(key, data) {
  const localStorageItems = getLocalStorage(key);

  const itemIndex = localStorageItems.findIndex((item) => item.product.Id === data.Id);

  if(itemIndex !== -1) {
    localStorage.setItem(key, JSON.stringify(
      localStorageItems.map((item, index) => index === itemIndex ? {
        ...item,
        quantity: item.quantity + 1
      } : item)));
  } else {
    localStorage.setItem(key, JSON.stringify([
      ...localStorageItems,
      {
        product: data,
        quantity: 1
      }
    ]))
  }

}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// helper to get parameter strings
export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

// function to take a list of objects and a template and insert the objects as HTML into the DOM
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}


export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback
) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path){
  const html = await fetch(path);
  const template = await html.text();
  return template;
}

export async function loadHeaderFooter(){
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#header");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#footer");
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

export function updateIcon() {
  let activeCart = getLocalStorage("so-cart");
  const cartCount = document.getElementById("cart-count");
  let count = 0;
  activeCart.forEach((item) => count += item.quantity);
  cartCount.innerHTML = count;

  if (count == 0) {
    cartCount.style.display = "none";
  } else {
    cartCount.style.display = "block";
  }
}

export function calculateDiscountPercent(product) {
  const calcListPrice = product.SuggestedRetailPrice;
  const calcFinalPrice = product.FinalPrice;
  const discountPrice = calcListPrice - calcFinalPrice;
  const discountPercent = ((discountPrice / calcListPrice) * 100).toFixed(0);
  return discountPercent;
}

export function calculateDiscountAmount(product) {
  const calcListPrice = product.SuggestedRetailPrice;
  const calcFinalPrice = product.FinalPrice;
  const discountPrice = calcListPrice - calcFinalPrice;
  return discountPrice;
}
export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");

  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);

  // left this here to show how you could remove the alert automatically after a certain amount of time.
  // setTimeout(function () {
  //   main.removeChild(alert);
  // }, duration);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}