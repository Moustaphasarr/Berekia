let menuHamburger = document.querySelector(".menu_burger, .menu-toggle");
const navLinks = document.querySelector(".nav");
const body = document.body;

if (!menuHamburger && navLinks) {
    const headerContainer = document.querySelector(".header .container");
    if (headerContainer) {
        menuHamburger = document.createElement("div");
        menuHamburger.className = "menu_burger";
        menuHamburger.innerHTML = `
            <span class="burger_line"></span>
            <span class="burger_line"></span>
            <span class="burger_line"></span>
        `;
        headerContainer.appendChild(menuHamburger);
    }
}

if (menuHamburger && navLinks) {
    // Compatibilite avec anciens markups menu-toggle/bar.
    if (menuHamburger.classList.contains("menu-toggle")) {
        menuHamburger.classList.add("menu_burger");
        menuHamburger.querySelectorAll(".bar").forEach((bar) => {
            bar.classList.add("burger_line");
        });
    }

    menuHamburger.addEventListener("click", () => {
        navLinks.classList.toggle("mobile-menu");
        body.classList.toggle("no-scroll");
        menuHamburger.classList.toggle("active");
    });
}
