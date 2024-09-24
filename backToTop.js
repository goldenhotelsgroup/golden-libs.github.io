// Function to create the Back to Top button
function createBackToTopButton() {
    const btn = document.createElement('button');
    btn.id = 'backToTopBtn';
    btn.innerText = 'Back to Top';

    // Append the button to the body
    document.body.appendChild(btn);

    // Show the button when the user scrolls down 100px from the top of the page
    window.onscroll = function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            btn.style.display = 'block';
        } else {
            btn.style.display = 'none';
        }
    };

    // Scroll to the top when the button is clicked
    btn.onclick = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
}

// Run the function to create the button when the page loads
document.addEventListener('DOMContentLoaded', createBackToTopButton);
