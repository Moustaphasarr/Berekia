document.addEventListener("DOMContentLoaded", function () {
    var lightbox = document.getElementById("image-lightbox");
    var lightboxImage = document.getElementById("lightbox-image");
    var closeButton = document.querySelector(".lightbox-close");
    var galleryImages = document.querySelectorAll(".project-gallery img");

    if (!lightbox || !lightboxImage || !closeButton || galleryImages.length === 0) {
        return;
    }

    function openLightbox(img) {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt || "Image du projet";
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("lightbox-open");
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("lightbox-open");
        lightboxImage.src = "";
    }

    galleryImages.forEach(function (img) {
        img.addEventListener("click", function () {
            openLightbox(img);
        });
    });

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && lightbox.classList.contains("active")) {
            closeLightbox();
        }
    });
});
