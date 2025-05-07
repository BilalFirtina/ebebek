// You code should only run in homepage,
if (window.location.pathname !== "/") {
  console.log("wrong page");
  throw new Error("Script should only run on homepage");
}
// It should retrieve the product list from local storage rather than sending a new fetch request.
let products = JSON.parse(localStorage.getItem("products")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Creating Outer Element
const gatheredProducts = document.createElement("eb-product-carousel");
gatheredProducts.innerHTML = `
 <div class="banner">
      <div class="container">
        <eb-carousel-header class="ng-star-inserted">
          <div class="banner__titles">
            <h2 class="title-primary">Beğenebileceğinizi düşündüklerimiz</h2>
          </div>
        </eb-carousel-header>
        <div ebvisibilityobserver="" class="banner__wrapper ins-preview-wrapper-10167 ng-star-inserted">
          <div>
            <owl-carousel-o class="product-list__best-products">
              <div class="owl-carousel owl-theme owl-loaded owl-responsive owl-drag">
                <div class="owl-stage-outer ng-star-inserted">
                  <owl-stage class="ng-tns-c125-3 ng-star-inserted">
                    <div class="ng-tns-c125-3">
                      <div class="owl-stage ng-tns-c125-3" style="width: 3858px; transform: translate3d(0px, 0px, 0px); transition: all;">
                      <!-- Products will be here -->
                      </div>
                    </div>
                  </owl-stage>
                </div>
              </div>
            </owl-carousel-o>
          </div>
          <button aria-label="back" class="swiper-prev"></button>
          <button aria-label="next" class="swiper-next"></button>
        </div>
      </div>
    </div>
    `;
  // Catching DOM elements for events
  const owlStage = gatheredProducts.querySelector(".owl-stage");
  const rightArrow = gatheredProducts.querySelector(".swiper-next");
  const leftArrow = gatheredProducts.querySelector(".swiper-prev");

// Responsive Design
 function applyResponsiveDesign() {
   const width = window.innerWidth;
   if (width >= 1480) return { numberOfItemsInRow: 5, widthOfItem: 257.2 };
   if (width >= 1280) return { numberOfItemsInRow: 4, widthOfItem: 292.5 };
   if (width >= 992) return { numberOfItemsInRow: 3, widthOfItem: 316.663 };
   return { numberOfItemsInRow: 2, widthOfItem: 355 };
}
let { numberOfItemsInRow, widthOfItem } = applyResponsiveDesign();


// Fetching products from link
async function getProducts() {
  if (!products) {
    try {
      const result = await fetch("https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json");
      products = await result.json();
      //We upload products to localstorage
      localStorage.setItem("products", JSON.stringify(products));
      createCarousel(products);
    } catch (error) {
      console.log(error.message);
      alert("Products could not be loaded. Please try again.");
      return;
    }
  } else {
    createCarousel(products);
  }
}

getProducts();

function createCarousel(products) {
  products.forEach((product) => {
    const element = document.createElement("div");
    element.className =
      "owl-item ng-tns-c125-3 ng-trigger ng-trigger-autoHeight ng-star-inserted";
    element.style.width = `${widthOfItem - 20}px`;
    element.style.marginRight = "20px";

    let discountHTML = "";
    if (product.original_price > product.price) {
      const discountPercent =
        ((product.original_price - product.price) / product.original_price) *
        100;
      discountHTML = `
        <div class="d-flex align-items-center ng-star-inserted">
          <span class="product-item__old-price ng-star-inserted">${product.original_price
            .toFixed(2)
            .replace(".", ",")} TL</span>
          <span class="product-item__percent carousel-product-price-percent ml-2 ng-star-inserted"> %${discountPercent.toFixed(0)} <i class="icon icon-decrease"></i></span>
        </div>
        <span class="product-item__new-price discount-product ng-star-inserted">${product.price
          .toFixed(2)
          .replace(".", ",")} TL</span>
      `;
    } else {
      discountHTML = `
        <div class="d-flex align-items-center ng-star-inserted">
          <span class="product-item__new-price ng-star-inserted">${product.price
            .toFixed(2)
            .replace(".", ",")} TL</span>
        </div>
      `;
    }

    element.innerHTML = `
      <div class="ins-web-smart-recommender-box-item ng-star-inserted">
        <div class="ins-product-box ins-element-link ins-add-to-cart-wrapper ins-sr-api" ins-product-id="${
          product.id
        }">
          <eb-carousel-product-item>
            <div class="product-item">
              <a class="product-item-anchor ng-star-inserted" href="${product.url}" target="_blank">
                <figure class="product-item__img without-ar ng-star-inserted">
                  <cx-media alt="${
                    product.name
                  }" format="product" id="lnkProduct${
      product.id
    }" class="is-initialized">
                    <img class="ng-star-inserted lazyloaded" alt="${
                      product.name
                    }" src="${product.img}"/>
                  </cx-media>
                </figure>
                <div class="product-item-content ng-star-inserted">
                  <h2 class="product-item__brand ng-star-inserted">
                    <b>${product.brand} - </b><span>${product.name}</span>
                  </h2>
                  <div class="d-flex mb-2 stars-wrapper align-items-center ng-star-inserted">
                    <cx-star-rating disabled="true" style="--star-fill: 0;">
                      <cx-icon class="star cx-icon fas fa-star ng-star-inserted"></cx-icon>
                      <cx-icon class="star cx-icon fas fa-star ng-star-inserted"></cx-icon>
                      <cx-icon class="star cx-icon fas fa-star ng-star-inserted"></cx-icon>
                      <cx-icon class="star cx-icon fas fa-star ng-star-inserted"></cx-icon>
                      <cx-icon class="star cx-icon fas fa-star ng-star-inserted"></cx-icon>
                    </cx-star-rating>
                    <p class="review-count ng-star-inserted"></p>
                  </div>
                  <div class="product-item__price">${discountHTML}</div>
                </div>
                <div class="product-list-promo ng-star-inserted"></div>
              </a>
              <eb-add-to-wish-list>
                <a class="ng-star-inserted">
                  <div class="heart" data-product-id="${product.id}">
                    ${
                      favorites.includes(product.id)
                        ? `<img src="assets/svg/added-favorite.svg" alt="heart fill" class="heart-icon"/>
                      <img src="assets/svg/added-favorite-hover.svg" alt="heart fill" class="heart-icon hovered"/>`
                        : `<img id="default-favorite" src="assets/svg/default-favorite.svg" alt="heart" class="heart-icon"/>
                      <img src="assets/svg/default-hover-favorite.svg" alt="heart" class="heart-icon hovered"/>`
                    }
                  </div>
                </a>
              </eb-add-to-wish-list>
              <div class="ins-add-to-cart-wrapper" ins-product-id="${
                product.id
              }">
                <eb-add-to-cart buttonclass="close-btn">
                  <form novalidate="" class="ng-untouched ng-pristine ng-valid ng-star-inserted">
                    <button id="addToCartBtn" type="submit" class="btn close-btn disable ng-star-inserted">Sepete Ekle</button>
                  </form>
                </eb-add-to-cart>
              </div>
            </div>
          </eb-carousel-product-item>
        </div>
      </div>
    `;

    const clickHeart = element.querySelector(".heart");
    clickHeart.addEventListener("click", () => {
      const productId = product.id;

      if (favorites.includes(productId)) {
        const index = favorites.indexOf(productId);
        favorites.splice(index, 1);
        clickHeart.innerHTML = `
          <img id="default-favorite" src="assets/svg/default-favorite.svg" alt="heart" class="heart-icon">
          <img src="assets/svg/default-hover-favorite.svg" alt="heart" class="heart-icon hovered">
        `;
      } else {
        favorites.push(productId);
        clickHeart.innerHTML = `
          <img src="assets/svg/added-favorite.svg" alt="heart fill" class="heart-icon">
          <img src="assets/svg/added-favorite-hover.svg" alt="heart fill" class="heart-icon hovered">
        `;
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
    });

    owlStage.appendChild(element);
  });
}

let currentTransform = 0;
const numberOfItems = products.length;
let currentIndex = 0;

 function updateActiveItems() {
   const items = owlStage.querySelectorAll(".owl-item");
   items.forEach((item, index) => {
     item.classList.remove("active");
     if (index >= currentIndex && index < currentIndex + numberOfItemsInRow) {
       item.classList.add("active");
     }
   });
}

leftArrow.addEventListener("click", () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = numberOfItems - numberOfItemsInRow;
    currentTransform = -currentIndex * widthOfItem;
  } else {
    currentTransform += widthOfItem;
  }

  owlStage.style.transform = `translate3d(${currentTransform}px, 0px, 0px)`;
  owlStage.style.transition = "transform 0.50s ease-out";
  updateActiveItems();
});

rightArrow.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex + numberOfItemsInRow > numberOfItems) {
    currentIndex = 0;
    currentTransform = 0;
  } else {
    currentTransform -= widthOfItem;
  }

  owlStage.style.transform = `translate3d(${currentTransform}px, 0px, 0px)`;
  owlStage.style.transition = "transform 0.50s ease-out";
  updateActiveItems();
});

  window.addEventListener("resize", () => {
   const settings = applyResponsiveDesign();
   numberOfItemsInRow = settings.numberOfItemsInRow;
   widthOfItem = settings.widthOfItem;
   const items = owlStage.querySelectorAll(".owl-item");
   items.forEach((item) => {
     item.style.width = `${widthOfItem - 20}px`;
   });
   currentTransform = -currentIndex * widthOfItem;
   owlStage.style.transform = `translate3d(${currentTransform}px, 0px, 0px)`;
   updateActiveItems();
  });
 // Element to be changed is selected
const sectionCarousel = document.querySelector('cx-page-slot[position="Section2A"]');
sectionCarousel.insertBefore(gatheredProducts, sectionCarousel.firstChild);
 updateActiveItems();
