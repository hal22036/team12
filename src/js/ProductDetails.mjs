import { getLocalStorage, setLocalStorage, updateIcon, calculateDiscountPercent } from "./utils.mjs";

function productDetailsTemplate(product, discountPercent) {
  const discountInfo = discountPercent > 0? `<p class ="product-card__discount">Discount: ${discountPercent}%</p>`: '';
  const colorsHTML = product.Colors.map((color, index) => `
  <div class="color-swatch" data-color-id="${index}">
    <img class="color-swatch-image" src="${color.ColorChipImageSrc}">
    <p class="product__color">${color.ColorName}</p>
  </div>`).join('');

  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    ${discountInfo}
    <div class="color-swatches">${colorsHTML}</div>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // once we have the product details we can render out the HTML
    this.renderProductDetails("main");
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }
  addToCart() {  
    setLocalStorage("so-cart", this.product);
    updateIcon();
  }
  productDiscount (product) {
    var calcListPrice = (product.SuggestedRetailPrice);
    var calcFinalPrice = (product.FinalPrice);
    var discountPrice = calcListPrice - calcFinalPrice;
    console.log(discountPrice);
    var discountPercent = ((discountPrice / calcFinalPrice)* 100).toFixed(0);
    console.log(discountPercent);
    return discountPercent;
    }
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    const discountPercent = calculateDiscountPercent(this.product);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product, discountPercent)
    );
    const colorSwatches = document.querySelectorAll('.color-swatch');
    colorSwatches.forEach(swatch => {
      swatch.addEventListener('click', this.handleColorSelection.bind(this));
    });
  }
  handleColorSelection(event) {
    const selectedColorId = event.currentTarget.getAttribute('data-color-id');
    const selectedColor = this.product.Colors[selectedColorId];
    
    // Remove 'selected' class from all color swatches
    const colorSwatches = document.querySelectorAll('.color-swatch');
    colorSwatches.forEach(swatch => {
      swatch.classList.remove('selected');
    });

    // Update UI (e.g., highlight the selected color)
    event.currentTarget.classList.add('selected'); // Apply a 'selected' class in your CSS

    // Perform other actions (e.g., store the selected color in component state)
    this.selectedColor = selectedColor;
    // Check it's working correctly with console.log
    console.log('Selected Color:', selectedColor);
  }
}