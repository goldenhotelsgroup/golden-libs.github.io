function createVideoPlayer(containerId, videoUrl) {
    const container = document.getElementById(containerId);
    console.log("Video player is being created");

    // Create the video player HTML structure
    container.innerHTML = `
        <div class="video-wrapper">
            <video autoplay loop muted playsinline class="background-video">
                <source src="${videoUrl}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
    `;
}
