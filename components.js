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
        <div class="black-overlay"></div>
        </div>
    `;
}

function createEventList(containerId, pageId, defaultImageUrl) {
    const container = document.getElementById(containerId);
    container.innerHTML = `<div id="events-container"></div>`;
    const eventsContainer = container.querySelector('#events-container');

    // Fetch the access token from your Flask app
    const fetchAccessToken = async () => {
        try {
            const response = await fetch('https://goldenhotelsgroup.pythonanywhere.com/get_token');
            const data = await response.json();
            return data.token;
        } catch (error) {
            console.error('Error fetching access token:', error);
            return null;
        }
    };

    // Fetch the page profile picture
    const fetchProfilePicture = async (accessToken) => {
        try {
            const response = await fetch(`https://graph.facebook.com/v20.0/${pageId}/picture?redirect=false&access_token=${accessToken}`);
            const data = await response.json();
            if (data.error) {
                console.error('Error fetching profile picture:', data.error);
                return null;
            }
            return data.data.url;
        } catch (error) {
            console.error('Error fetching profile picture:', error);
            return null;
        }
    };

    const fetchEvents = async () => {
        try {
            const accessToken = await fetchAccessToken();
            console.log('Access Token:', accessToken); // Add this line

            if (!accessToken) {
                console.error('Access token is missing');
                return;
            }
            
            // Fetch the page profile picture
            const defaultImageUrl = await fetchProfilePicture(accessToken);
            console.log('Default Profile Picture URL:', defaultImageUrl);

            // Fetch upcoming and past events from the Facebook Graph API
            const upcomingResponse = await fetch(`https://graph.facebook.com/v20.0/${pageId}/events?fields=id,name,start_time,end_time,description,cover&time_filter=upcoming&access_token=${accessToken}`);
            const upcomingData = await upcomingResponse.json();

            const pastResponse = await fetch(`https://graph.facebook.com/v20.0/${pageId}/events?fields=id,name,start_time,end_time,description,cover&time_filter=past&access_token=${accessToken}`);
            const pastData = await pastResponse.json();

            if (upcomingData.error || pastData.error) {
                console.error('API Error:', upcomingData.error || pastData.error);
                return;
            }

            // Clear existing content
            eventsContainer.innerHTML = '';

            // Handle upcoming events
            const upcomingEvents = upcomingData.data;
            if (upcomingEvents.length > 0) {
                const upcomingLabel = document.createElement('h2');
                upcomingLabel.textContent = 'Upcoming Events';
                eventsContainer.appendChild(upcomingLabel);

                upcomingEvents.forEach(event => {
                    const startTime = new Date(event.start_time);
                    const endTime = event.end_time ? new Date(event.end_time) : null;
                    const formattedStartTime = startTime.toLocaleDateString();
                    const formattedEndTime = endTime && endTime.getTime() !== startTime.getTime() ? ` - ${endTime.toLocaleDateString()}` : '';

                    const eventLink = `https://www.facebook.com/events/${event.id}`;
                    const coverImage = event.cover ? event.cover.source : defaultImageUrl;

                    // Create event HTML structure
                    const eventDiv = document.createElement('a');
                    eventDiv.href = eventLink;
                    eventDiv.target = "_blank";
                    eventDiv.className = 'event';
                    eventDiv.innerHTML = `
                        <div class="event-image">
                            <img src="${coverImage}" alt="Event cover" class="event-cover">
                        </div>
                        <div class="event-info">
                            <h3>${event.name}</h3>
                            <p>${formattedStartTime}${formattedEndTime}</p>
                            <p>${event.description || 'No description available'}</p>
                        </div>
                    `;

                    eventsContainer.appendChild(eventDiv);
                });
            }

            // Handle past events, limited to 6 events
            const pastEvents = pastData.data.slice(0, 6);
            if (pastEvents.length > 0) {
                const pastLabel = document.createElement('h2');
                pastLabel.textContent = 'Previous Events';

                eventsContainer.appendChild(pastLabel);

                pastEvents.forEach(event => {
                    const startTime = new Date(event.start_time);
                    const endTime = event.end_time ? new Date(event.end_time) : null;
                    const formattedStartTime = startTime.toLocaleDateString();
                    const formattedEndTime = endTime && endTime.getTime() !== startTime.getTime() ? ` - ${endTime.toLocaleDateString()}` : '';

                    const eventLink = `https://www.facebook.com/events/${event.id}`;
                    const coverImage = event.cover ? event.cover.source : defaultImageUrl;

                    // Create event HTML structure
                    const eventDiv = document.createElement('a');
                    eventDiv.href = eventLink;
                    eventDiv.target = "_blank";
                    eventDiv.className = 'event';
                    eventDiv.innerHTML = `
                        <div class="event-image">
                            <img src="${coverImage}" alt="Event cover" class="event-cover">
                        </div>
                        <div class="event-info">
                            <h3>${event.name}</h3>
                            <p>${formattedStartTime}${formattedEndTime}</p>
                            <p>${event.description || 'No description available'}</p>
                        </div>
                    `;

                    eventsContainer.appendChild(eventDiv);
                });
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    // Fetch and display events
    fetchEvents();
}
