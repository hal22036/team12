import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParams, updateIcon } from "./utils.mjs";
// import Alert from "./Alert";

(async () => {
  await loadHeaderFooter();
  const category = getParams("category");
  const ExternalServicesInstance = new ExternalServices();
  const element = document.querySelector(".product-list");
  // then create an instance of our ProductList class and send it the correct information.
  const productList = new ProductListing(
    category,
    ExternalServicesInstance,
    element
  );
  // finally call the init method to show our products
  productList.init();
  // new Alert();
  updateIcon();
})();
