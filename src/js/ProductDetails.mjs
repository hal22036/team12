import { getLocalStorage, setLocalStorage, updateIcon, calculateDiscountPercent } from "./utils.mjs";

function productDetailsTemplate(product, discountPercent) {
  const discountInfo = discountPercent > 0? `<p class ="product-card__discount">Discount: ${discountPercent}%</p>`: '';

  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>


    <div class="slider">
      <img
        class="divider slide"
        src="${product.Images.PrimaryLarge}"
        alt="${product.NameWithoutBrand}"
      />
      <button id="nextBtn" class="btn btn-next">></button>
      <button id="prevBtn" class="btn btn-prev"><</button>
    </div>



    <p class="product-card__priceSug">Price:$${product.FinalPrice}</p>
    <p class="product-card__discount"><span class="circle2">Save ${discountPercent}%</span></p>
    <p class="product-card_price"><s>Original Price: $${product.SuggestedRetailPrice}</s></p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
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
    // window.addEventListener('resize', this.updateImageSize.bind(this));
  }
  addToCart() {  
    setLocalStorage("so-cart", this.product);
    updateIcon();
  }


  handleCarouselClick() {
    const carouselItems = document.querySelectorAll('.slide');
      let currentIndex = 0;

      function showSlide(index) {
        // Hide all carousel items
        carouselItems.forEach(item => {
          item.style.display = 'none';
        });

        // Show the slide at the specified index
        carouselItems[index].style.display = 'block';
      }

      function nextSlide() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        showSlide(currentIndex);
      }

      function previousSlide() {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        showSlide(currentIndex);
      }

      // Show the first slide initially
      showSlide(currentIndex);

      // Set up event listeners for next and previous buttons
      document.getElementById('nextBtn').addEventListener('click', nextSlide);
      document.getElementById('prevBtn').addEventListener('click', previousSlide);
  }

  createImgInDOM(product, NameWithoutBrand) {
    const imagesContainer = document.querySelector(".slider");
    const imgItem = document.createElement("img");
    const item = imagesContainer.appendChild(imgItem);
    item.className="divider slide";
    item.src = product.Src;
    item.alt = NameWithoutBrand;
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
  
      // Create a new Image object and set its source
      var image = new Image();
      image.src = this.product.Images.PrimaryLarge;
  
      // Adjust the image width based on screen width
      var screenWidth = window.innerWidth;
      if (screenWidth < 600) {
        image.width = 300;
      } else if (screenWidth < 1200) {
        image.width = 600;
      } else {
        image.width = 800;
      }

      element.insertAdjacentHTML(
        "afterBegin",
        productDetailsTemplate(this.product, discountPercent)
      );
      

      // Checks whether exist extra images
      if(this.product.Images.ExtraImages == null) {
        document.getElementById('nextBtn').style.display = "none";
        document.getElementById('prevBtn').style.display = "none";
      }
      // Carousel Feature
      this.product.Images.ExtraImages?.forEach((extraImage) => {
        this.createImgInDOM(extraImage, this.product.NameWithoutBrand)
      })
      // Carousel
      this.handleCarouselClick();
      
      
      // Get the image element from the DOM after it's been added
      var existingImage = document.querySelector('.product-detail img');
  
      // Update the existing image with the new source and width
      existingImage.src = image.src;
      existingImage.width = image.width;
  
      // Add window resize event listener to adjust image size dynamically
      window.addEventListener('resize', () => {var screenWidth = window.innerWidth;
  
      // Adjust the image width based on screen width
        if (screenWidth < 600) {
          existingImage.width = 300;
        } else if (screenWidth < 800) {
          existingImage.width = 400;
        } else if (screenWidth < 1000) {
          existingImage.width = 500
        } else if (screenWidth < 1200) {
          existingImage.width = 600;
        } else {
          existingImage.width = 800;
        }
      }
    );
  }
}