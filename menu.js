const menuHamburger = document.querySelector(".menu_burger");
const navLinks = document.querySelector(".nav");
const body = document.body;

// menuHamburger.addEventListener('click', () => {
//     navLinks.classList.toggle('mobile-menu');
//     body.classList.toggle('no-scroll');
// });
menuHamburger.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-menu');
    body.classList.toggle('no-scroll');
    menuHamburger.classList.toggle('active');
});