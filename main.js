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