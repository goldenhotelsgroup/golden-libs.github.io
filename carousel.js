class ImageCarousel {
  constructor(container, images) {
    this.container = document.querySelector(container);
    this.images = images;
    this.currentIndex = 0;

    // Initialize the carousel
    this.initCarousel();
  }

  initCarousel() {
    // Create the carousel HTML structure
    const galleryContainer = document.createElement('div');
    galleryContainer.classList.add('custom-gallery-container');

    const galleryNav = `
      <div class="gallery-nav">
        <button class="prev">
          <img src="left-arrow.png" alt="Previous">
        </button>
        <button class="next">
          <img src="right-arrow.png" alt="Next">
        </button>
      </div>
    `;

    const gallery = document.createElement('div');
    gallery.classList.add('custom-gallery');

    // Add the images to the carousel
    this.images.forEach((imageSrc) => {
      const galleryItem = document.createElement('div');
      galleryItem.classList.add('gallery-item');
      const img = document.createElement('img');
      img.src = imageSrc;
      img.alt = "Carousel Image";
      galleryItem.appendChild(img);
      gallery.appendChild(galleryItem);
    });

    // Add gallery and navigation buttons to the container
    galleryContainer.appendChild(gallery);
    galleryContainer.innerHTML += galleryNav;
    this.container.appendChild(galleryContainer);

    // Add event listeners for buttons
    const prevButton = this.container.querySelector('.prev');
    const nextButton = this.container.querySelector('.next');

    prevButton.addEventListener('click', () => this.showPreviousImage());
    nextButton.addEventListener('click', () => this.showNextImage());
  }

  showPreviousImage() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateCarousel();
  }

  showNextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateCarousel();
  }

  updateCarousel() {
    const galleryItems = this.container.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
      item.style.display = index === this.currentIndex ? 'block' : 'none';
    });
  }
}

// Usage example
document.addEventListener('DOMContentLoaded', function () {
  const images = [
    'https://i.imgur.com/V9Xz2q6.jpeg',
    'https://i.imgur.com/V9Xz2q6.jpeg',
    'https://i.imgur.com/V9Xz2q6.jpeg'
  ];
  new ImageCarousel('#carouselContainer', images);
});