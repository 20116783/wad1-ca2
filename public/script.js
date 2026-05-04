$(document).ready(function () {
    const path = window.location.pathname.split('/')[1] || 'home';
    const activeLink = document.getElementById(path);
    if (activeLink) activeLink.classList.add('active');
});
