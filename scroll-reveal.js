document.documentElement.classList.add("sr-enabled");

document.addEventListener("DOMContentLoaded", function () {
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function parseStatText(rawText) {
        var match = rawText.trim().match(/^([^\d]*)(\d+)(.*)$/);
        if (!match) return null;
        return {
            prefix: match[1],
            value: parseInt(match[2], 10),
            suffix: match[3]
        };
    }

    function animateStatValue(node, stat) {
        var duration = 2000;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var elapsed = timestamp - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.round(stat.value * eased);

            node.textContent = stat.prefix + current + stat.suffix;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                node.textContent = stat.prefix + stat.value + stat.suffix;
            }
        }

        requestAnimationFrame(step);
    }

    function setupStatCounters() {
        var statNodes = document.querySelectorAll(".stat-number");
        if (!statNodes.length) return;

        var stats = [];
        statNodes.forEach(function (node) {
            var parsed = parseStatText(node.textContent);
            if (!parsed) return;
            stats.push({ node: node, stat: parsed });
        });

        if (!stats.length) return;

        if (reducedMotion) {
            stats.forEach(function (item) {
                item.node.textContent = item.stat.prefix + item.stat.value + item.stat.suffix;
            });
            return;
        }

        var statObserver = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var node = entry.target;
                if (node.dataset.counted === "true") {
                    obs.unobserve(node);
                    return;
                }

                var stat = parseStatText(node.dataset.statTarget || node.textContent);
                if (stat) {
                    animateStatValue(node, stat);
                    node.dataset.counted = "true";
                }
                obs.unobserve(node);
            });
        }, {
            threshold: 0.45,
            rootMargin: "0px 0px -6% 0px"
        });

        stats.forEach(function (item) {
            item.node.dataset.statTarget = item.node.textContent.trim();
            item.node.textContent = item.stat.prefix + "0" + item.stat.suffix;
            statObserver.observe(item.node);
        });
    }

    setupStatCounters();

    if (reducedMotion) return;

    function addReveal(selector, direction, staggerStep) {
        var nodes = document.querySelectorAll(selector);
        nodes.forEach(function (node, index) {
            node.classList.add("reveal-item", direction);
            if (staggerStep) {
                node.style.setProperty("--reveal-delay", (index * staggerStep) + "ms");
            }
        });
    }

    var page = (window.location.pathname.split("/").pop() || "accueil.html").toLowerCase();

    if (page === "accueil.html" || page === "") {
        addReveal(".hero-content", "reveal-left");
        addReveal(".hero-image", "reveal-right");
        addReveal(".about-preview .section-title", "reveal-up");
        addReveal(".about-preview .about-content", "reveal-up");
        addReveal(".formations-preview .section-title", "reveal-up");
        addReveal(".formations-preview .formation-card", "reveal-up", 90);
        addReveal(".formations-preview .formations-action", "reveal-up");
        addReveal(".why-choose-section .section-title, .why-choose-section .section-subtitle", "reveal-up");
        addReveal(".why-choose-section .stats-grid .stat-card", "reveal-up", 80);
        addReveal(".why-choose-section .features-grid .feature-card", "reveal-up", 80);
        addReveal(".footer .footer-section, .footer .footer-bottom", "reveal-up", 70);
    }

    if (page === "apropos.html") {
        addReveal(".about-hero-wrapper .page-title", "reveal-up");
        addReveal(".section-title, .uppercase-title", "reveal-up");
        addReveal(".intro-text, .parcours-section .timeline, .distinctions-box, .competences-list", "reveal-left");
        addReveal(".intro-image, .interests-grid", "reveal-right");
    }

    if (page === "formation.html") {
        addReveal(".formations-hero .page-title, .formations-hero .hero-description", "reveal-up");
        addReveal(".formations-nav", "reveal-up");
        addReveal(".why-choose-section .section-title, .why-choose-section .section-subtitle", "reveal-up");
        addReveal(".why-choose-section .stats-grid .stat-card", "reveal-up", 80);
        addReveal(".why-choose-section .features-grid .feature-card", "reveal-up", 80);
        addReveal(".formations-list .formation-item", "reveal-up", 100);
    }

    if (page === "realisation.html") {
        addReveal(".realisations-hero .page-title, .realisations-hero .page-subtitle", "reveal-up");
        addReveal(".section-title", "reveal-up");
        addReveal(".testimonials-grid .testimonial-card", "reveal-up", 90);
        addReveal(".projects-grid .project-card", "reveal-up", 90);
        addReveal(".stats-grid .stat-item", "reveal-up", 70);
    }

    if (page === "contact&faq.html") {
        addReveal(".contact-section .page-title, .faq-section .section-title", "reveal-up");
        addReveal(".contact-form-wrapper", "reveal-up");
        addReveal(".contact-info, .contact-info .info-item", "reveal-right", 70);
        addReveal(".faq-container .faq-item", "reveal-up", 70);
    }

    if (page === "doc&tarifs.html") {
        addReveal(".docs-hero .page-title, .docs-hero .page-subtitle", "reveal-up");
        addReveal(".documents-section .section-title, .documents-section .section-subtitle", "reveal-up");
        addReveal(".documents-section .doc-card-enhanced", "reveal-up", 80);
        addReveal(".pricing-section .section-title, .pricing-section .section-subtitle", "reveal-up");
        addReveal(".pricing-grid .pricing-card", "reveal-up", 90);
        addReveal(".pricing-note", "reveal-up");
        addReveal(".payment-section .section-title", "reveal-up");
        addReveal(".payment-info .payment-item", "reveal-up", 80);
    }

    // Footer reveal on all pages using this script.
    addReveal(".footer .footer-section, .footer .footer-bottom", "reveal-up", 70);

    var observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("reveal-visible");
            obs.unobserve(entry.target);
        });
    }, {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px"
    });

    document.querySelectorAll(".reveal-item").forEach(function (node) {
        observer.observe(node);
    });
});
