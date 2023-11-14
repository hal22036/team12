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
  /**
   * Passo a passo:
   * 
   * 1. Verificar se tem alguma informação no localStorage
   */

  const localStorageItems = getLocalStorage(key);

  const itemIndex = localStorageItems.findIndex((item) => item.product.Id === data.Id);

  console.log({itemIndex});

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
  console.log({here: cartCount});
  let count = 0;
  activeCart.forEach((item) => count += item.quantity);
  cartCount.innerHTML = count;

  if (count == 0) {
    cartCount.style.display = "none";
  } else {
    cartCount.style.display = "block";
  }
}