function toggleNav() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.sidebar');
    const navOverlay = document.getElementById('nav-overlay');
    const isOpen = hamburger.classList.contains('open');

    if (isOpen) {
        hamburger.classList.remove('open');
        // Close the nav menu and overlay
        navMenu.style.transform = 'translateX(100%)';
        navOverlay.style.transform = 'translateX(-100%)';
    } else {
        hamburger.classList.add('open');
        // Open the nav menu and overlay
        navMenu.style.transform = 'translateX(0%)';
        navOverlay.style.transform = 'translateX(0%)';
    }
}
// Close the nav when clicking outside of it
window.addEventListener('click', function (e) {
    if (!(document.getElementById('nav-menu').style.transform === 'translateX(0%)')) {
        return;
    }
    const navMenu = document.getElementById("nav-menu");
    const navButton = document.querySelector("button[onclick='toggleNav()']");

    if (!navMenu.contains(e.target) && !navButton.contains(e.target)) {
        toggleNav();
    }
});

function adjustMeshBgHeight() {
    const nav = document.querySelector('nav');
    const main = document.getElementById('main');
    const meshBg = document.querySelector('.hero-bg-mesh');

    try {
        const totalHeight = nav.offsetHeight + main.offsetHeight;
        meshBg.style.height = `${totalHeight}px`;
    }
    catch (error) {
        console.error(error);
    }
}

// Run on page load and window resize
window.addEventListener('load', adjustMeshBgHeight);
window.addEventListener('resize', adjustMeshBgHeight);

// Get the button:
let mybutton = document.getElementById("scrollToTop");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
