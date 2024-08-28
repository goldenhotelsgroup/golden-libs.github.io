# golden-libs

## Initialisation
Add the following to your header to initialise the stylesheet & component library:
```html
<link rel="preload" href="https://goldenhotelsgroup.github.io/golden-libs.github.io/style.css" as="style" onload="this.rel='stylesheet'">
<script src="https://goldenhotelsgroup.github.io/golden-libs.github.io/components.js"></script>
```

## Carousel Component
To initialise the component add the following code to your code block.

```html
<div id="carouselContainer1"></div>
<script src="https://goldenhotelsgroup.github.io/golden-libs.github.io/carousel.js"></script>

<!-- Script to initialize the carousel -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    createCarousel(
        "carouselContainer1",
        [
            "image-link-1",
            "image-link-2",
            "image-link-3",
            "image-link-4"
        ],
        "back-button-image",
        "forward-button-image"
    );
});
</script>
```

## Back Ground Video Component
To initialise the component add the following code to your code block.

```html
<div id="videoContainer"></div>
<script src="https://goldenhotelsgroup.github.io/golden-libs.github.io/background-video.js"></script>

<!-- Your script -->
<script>
    document.addEventListener('DOMContentLoaded', function() {
        createVideoPlayer('videoContainer', 'https://ambroseestate.com.au/wp-content/uploads/2019/07/Shannon%20&%20Rocco%20_Trailer.mp4');
    });
</script>
```

And now add the following to your custom CSS, making sure to swap the section ID for the section that should have the video. If not using this in Squarespace replace element with div.

```html
section[data-section-id="SECTION_ID"] {
   margin: 0, 0, 0, 0;
   padding: 0px;
   width: 100%;
   height: 100vh;
   overflow: hidden;
   box-sizing: border-box;
}
```
