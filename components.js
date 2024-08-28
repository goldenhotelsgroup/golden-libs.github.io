function createCarousel(containerId, imageUrls, prevBtnImg, nextBtnImg) {
    const container = document.getElementById(containerId);
    console.log("Carousel is being created");

    // Create the carousel HTML structure
    container.innerHTML = `
        <div class="custom-gallery-container">
            <div class="gallery-nav">
                <button class="prev">
                    <img src="${prevBtnImg}" alt="Previous">
                </button>
                <button class="next">
                    <img src="${nextBtnImg}" alt="Next">
                </button>
            </div>
            <div class="custom-gallery"></div>
        </div>
    `;

    const gallery = container.querySelector('.custom-gallery');
    
    // Dynamically add images to the gallery
    imageUrls.forEach(url => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        galleryItem.innerHTML = `<img src="${url}" alt="Carousel Image">`;
        gallery.appendChild(galleryItem);
    });

    const items = gallery.querySelectorAll('.gallery-item');
    const totalItems = items.length;
    let currentIndex = 0;
    let interval;

    function showSlide(index) {
        if (index >= totalItems) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = totalItems - 1;
        } else {
            currentIndex = index;
        }
        gallery.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function startAutoplay() {
        interval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    }

    function stopAutoplay() {
        clearInterval(interval);
    }

    // Attach event listeners for the buttons
    container.querySelector('.next').addEventListener('click', function() {
        nextSlide();
        stopAutoplay();
        startAutoplay(); // Restart autoplay after manual navigation
    });

    container.querySelector('.prev').addEventListener('click', function() {
        prevSlide();
        stopAutoplay();
        startAutoplay(); // Restart autoplay after manual navigation
    });

    // Autoplay and hover events
    gallery.addEventListener('mouseenter', stopAutoplay);
    gallery.addEventListener('mouseleave', startAutoplay);

    // Start autoplay on page load
    startAutoplay();
}
