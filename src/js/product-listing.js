import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParams, updateIcon } from "./utils.mjs";
// import Alert from "./Alert";

(async () => {
  await loadHeaderFooter();
  const category = getParams("category");
  const ExternalServicesInstance = new ExternalServices();
  const element = document.querySelector(".product-list");
  const productList = new ProductListing(
    category,
    ExternalServicesInstance,
    element
  );
  productList.init();
  // new Alert();
  updateIcon();
})();
