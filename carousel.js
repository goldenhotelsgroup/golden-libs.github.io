document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('carouselContainer');

    // Create the carousel HTML structure
    container.innerHTML = `
        <div class="custom-gallery-container">
            <div class="custom-gallery">
                <div class="gallery-item">
                    <img src="https://example.com/image1.jpg" alt="Image 1">
                </div>
                <div class="gallery-item">
                    <img src="https://example.com/image2.jpg" alt="Image 2">
                </div>
                <div class="gallery-item">
                    <img src="https://example.com/image3.jpg" alt="Image 3">
                </div>
            </div>
            <div class="gallery-nav">
                <button class="prev">
                    <img src="https://yourdomain.com/left-arrow.png" alt="Previous">
                </button>
                <button class="next">
                    <img src="https://yourdomain.com/right-arrow.png" alt="Next">
                </button>
            </div>
        </div>
    `;

    const gallery = document.querySelector('.custom-gallery');
    const items = document.querySelectorAll('.gallery-item');
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

    document.querySelector('.next').addEventListener('click', function() {
        nextSlide();
        stopAutoplay();
        startAutoplay(); // Restart autoplay after manual navigation
    });

    document.querySelector('.prev').addEventListener('click', function() {
        prevSlide();
        stopAutoplay();
        startAutoplay(); // Restart autoplay after manual navigation
    });

    gallery.addEventListener('mouseenter', stopAutoplay);
    gallery.addEventListener('mouseleave', startAutoplay);

    // Start autoplay on page load
    startAutoplay();
});
