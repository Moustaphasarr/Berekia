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

// Scroll reveal for formation detail pages (without editing each HTML file).
const detailHero = document.querySelector(".detail-hero");
if (detailHero) {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = [];

    const addReveal = (selector, direction, stagger = false, step = 0.08) => {
        const nodes = document.querySelectorAll(selector);
        nodes.forEach((node, index) => {
            node.classList.add("fd-reveal", `fd-reveal-${direction}`);
            if (stagger) {
                node.style.setProperty("--fd-delay", `${index * step}s`);
            }
            revealItems.push(node);
        });
    };

    addReveal(".detail-hero .back-link", "left");
    addReveal(".detail-hero .formation-title", "up");
    addReveal(".detail-hero .formation-tagline", "right");

    addReveal(".overview-section .overview-card", "up", true);

    addReveal(".description-section .section-title", "up");
    addReveal(".description-section .description-content", "left");

    addReveal(".learning-section .section-title", "up");
    addReveal(".learning-section .learning-item", "up", true);

    addReveal(".documents-section .section-title", "up");
    addReveal(".documents-section .section-subtitle", "up");
    addReveal(".documents-section .doc-card-enhanced", "up", true);
    addReveal(".documents-section .documents-placeholder", "up");

    addReveal(".cta-section h2", "up");
    addReveal(".cta-section p", "up");
    addReveal(".cta-section .cta-button", "up");

    addReveal("footer .footer-section", "up", true, 0.06);
    addReveal("footer .footer-bottom", "up");

    if (prefersReducedMotion) {
        revealItems.forEach((item) => item.classList.add("fd-reveal-visible"));
    } else {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("fd-reveal-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.16,
                rootMargin: "0px 0px -8% 0px",
            }
        );

        revealItems.forEach((item) => revealObserver.observe(item));
    }
}
