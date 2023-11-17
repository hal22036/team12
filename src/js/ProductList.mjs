import { renderListWithTemplate, calculateDiscountPercent, calculateDiscountAmount } from "./utils.mjs";

function productCardTemplate(product) {
  const discountPercent = calculateDiscountPercent(product);
  const discountIndicator = discountPercent > 0 ? `<span class = "discount-indicator"> ${discountPercent}%</span>`: '';
  const discountAmount = calculateDiscountAmount(product);
  const discountAmountIndicator = discountAmount > 0 ? `<span class = "discount-AmountIndicator"> ${discountAmount.toFixed(2)}</span>`: '';

  return `<li class="product-card">
          <h1 class="discountPercent"> <span class="circle">${discountIndicator} off</span></h1>
          <a href="/product_pages/index.html?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">Price: $${product.SuggestedRetailPrice}</p>
            <p class="discountAmount">Discount: $${discountAmountIndicator}</p>
            <p class="productFinalPrice">Your Price: $${product.FinalPrice}</p>

          </a>
        </li>`;
}

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    const list = await this.dataSource.getData(this.category);
    console.log({list});
    const filteredTents = this.filterProducts(list, 4);
    this.renderList(filteredTents, 'afterbegin', true);
    document.querySelector(".title").innerHTML = this.category;
  }

  filterProducts (allProducts, numberofTentsNeeded = 4) {

    // console.log({allProducts})
    return allProducts
    // .filter((product) => product.category === "Tent")
    .slice(0, numberofTentsNeeded);
     }

  renderList(list, position = "afterbegin", clearContent = true) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      position,
      clearContent
    );
  }
}