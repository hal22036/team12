import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  packageItems(items) {
    if (!Array.isArray(items)) {
      console.error("Error: 'items' is not an array");
      return [];
    }
    const simplifiedItems = items.map((item) => {
      return {
        id: item.product.Id,
        price: item.product.FinalPrice,
        name: item.product.Name,
        quantity: item.quantity,
      };
    });
    console.log("simplified", simplifiedItems);
    return simplifiedItems;
  }
  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }
  calculateItemSummary() {
    const summaryElement = document.querySelector(
      this.outputSelector + " #cartTotal"
    );

    const itemNumElement = document.querySelector(
      this.outputSelector + " #num-items"
    );
    itemNumElement.innerText = this.list.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    // Calculate the total of all the items in the cart
    const amounts = this.list
      .filter((item) => typeof item.product.FinalPrice === "number")
      .map((item) => item.product.FinalPrice * item.quantity);
      
    this.itemTotal = amounts.reduce((sum, item) => sum + item, 0);
    summaryElement.innerText = "$" + this.itemTotal.toFixed(2);
  }

  calculateOrdertotal() {  
    // Calculate total quantity of items
    let totalQuantity = 0;
    this.list.forEach(item => {
      totalQuantity += item.quantity;
    });
  
    // Calculate shipping based on total quantity
    this.shipping = 10 + Math.max(0, totalQuantity - 1) * 2;
  
    // Ensure this.itemTotal is properly calculated in calculateItemSummary
    this.tax = (this.itemTotal * 0.06).toFixed(2);
  
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);
    this.displayOrderTotals();
  }
  
  
  displayOrderTotals() {
    const shipping = document.querySelector(this.outputSelector + " #shipping");
    const tax = document.querySelector(this.outputSelector + " #tax");
    const orderTotal = document.querySelector(
      this.outputSelector + " #orderTotal"
    );

    shipping.innerText = "$" + this.shipping;
    tax.innerText = "$" + this.tax;
    orderTotal.innerText = "$" + this.orderTotal;
  }
  async checkout() {
    const formElement = document.forms["checkout"];

    const json = formDataToJSON(formElement);
    // Add totals, and item details
    json.orderDate = new Date();

    // Ensure that totals are up-to-date
    await this.calculateOrdertotal(); // Add the await here

    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = this.packageItems(this.list);

    console.log(json);
    try {
      const res = await services.checkout(json);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
}
