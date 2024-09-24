// Function to create the Back to Top button
function createBackToTopButton() {
    const btn = document.createElement('button');
    btn.id = 'backToTopBtn';
    btn.innerText = 'Back to Top';
    btn.style.display = 'none';
    btn.style.position = 'fixed';
    btn.style.bottom = '30px';
    btn.style.right = '30px';
    btn.style.zIndex = '1000';
    btn.style.backgroundColor = '#333';
    btn.style.color = 'white';
    btn.style.padding = '10px 20px';
    btn.style.border = 'none';
    btn.style.borderRadius = '5px';
    btn.style.cursor = 'pointer';
    btn.style.fontSize = '16px';
    btn.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)';
    btn.style.transition = 'opacity 0.3s';

    // Add hover effect
    btn.onmouseover = function() {
        btn.style.backgroundColor = '#555';
    };
    btn.onmouseout = function() {
        btn.style.backgroundColor = '#333';
    };

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
