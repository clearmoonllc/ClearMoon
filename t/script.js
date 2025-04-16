// Get the current year and update the footer
const currentYear = new Date().getFullYear();
const yearSpan = document.getElementById('current-year');
if (yearSpan) {
    yearSpan.textContent = currentYear;
}

// Optional: Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});