(function () {
  // 1. Carousel'ı oluştur ve 'stories' sonrasına ekle
  function initCarousel() {
    const carousel = createCarousel();
      const storiesSection = document.querySelector(".container-fluid"); // Ebebek'teki 'stories' ID'si
    if (storiesSection) {
      storiesSection.insertAdjacentElement("afterend", carousel);
    } else {
      console.error("'stories' section not found!");
    }
  }

  // 2. Carousel HTML/CSS yapısını oluştur
  function createCarousel() {
    // Ana container
    const carousel = document.createElement("div");
    carousel.className = "ebebek-carousel";

    // Başlık
    const header = document.createElement("h2");
    header.textContent = "Öne Çıkan Ürünler";
    carousel.appendChild(header);

    // Ürünler container
    const productsContainer = document.createElement("div");
    productsContainer.className = "carousel-products";

    // Örnek ürünler ekle (API'dan gelecekse fetch kullanılır)
    const products = [
      {
        id: 1,
        title: "Bebek Bezi",
        price: "₺199.99",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        title: "Biberon",
        price: "₺89.99",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 3,
        title: "Oyuncak",
        price: "₺149.99",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 4,
        title: "Tulum",
        price: "₺129.99",
        image: "https://via.placeholder.com/150",
      },
    ];

    products.forEach((product) => {
      productsContainer.appendChild(createProductCard(product));
    });

    carousel.appendChild(productsContainer);
    addCarouselStyles(); // CSS ekle
    return carousel;
  }

  // 3. Ürün kartı oluştur
  function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "product-card";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.title;

    const title = document.createElement("h3");
    title.textContent = product.title;

    const price = document.createElement("p");
    price.textContent = product.price;

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(price);
    return card;
  }

  // 4. CSS ekle
  function addCarouselStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .ebebek-carousel {
        font-family: Arial, sans-serif;
        margin: 20px 0;
        padding: 0 15px;
      }
      .carousel-products {
        display: flex;
        overflow-x: auto;
        gap: 15px;
        padding: 10px 0;
      }
      .product-card {
        min-width: 150px;
        border: 1px solid #eee;
        border-radius: 8px;
        padding: 10px;
        text-align: center;
      }
      .product-card img {
        width: 100%;
        height: auto;
      }
    `;
    document.head.appendChild(style);
  }

  // Carousel'ı başlat
  initCarousel();
})();
