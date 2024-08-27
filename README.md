# golden-libs

## Carousel Component

```html
<div id="carouselContainer"></div>

<link rel="preload" href="https://goldenhotelsgroup.github.io/golden-libs.github.io/style.css" as="style" onload="this.rel='stylesheet'">
<script src="https://goldenhotelsgroup.github.io/golden-libs.github.io/carousel.js"></script>

<script>
document.addEventListener('DOMContentLoaded', function() {
    createCarousel(
        "carouselContainer",
        [
            "link-to-image-one",
            "link-to-image-two",
            "link-to-image-three"
        ],
        "back-arrow-image",
        "forward-arrow-image"
    );
});
</script>
```

## Back Ground Video Component
Add the following to your custom CSS, making sure to swap the section ID for the section that should have the video.

```html
section[data-section-id="66c40b4fa5f1a64ede1cbfed"] {
   margin: 0, 0, 0, 0;
   padding: 0px;
   width: 100%;
   height: 100vh;
   overflow: hidden;
   box-sizing: border-box;
}
```
To initialise the component add the following code to your code block.

```html
<div class="video-wrapper">
   <video autoplay loop muted playsinline class="video">
      <source src="https://ambroseestate.com.au/wp-content/uploads/2019/07/Shannon%20&%20Rocco%20_Trailer.mp4" type="video/mp4">
      Your browser does not support the video tag.
   </video>
  <div class="black-overlay"></div> <!-- The transparent black overlay -->
</div>
```
