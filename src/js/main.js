import productData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const productDataInstance = new productData();
const productList = new ProductListing();
productDataInstance.renderList(productList);
