document.addEventListener("DOMContentLoaded", function () {
    var lightbox = document.getElementById("image-lightbox");
    var lightboxImage = document.getElementById("lightbox-image");
    var lightboxVideo = document.getElementById("lightbox-video");
    var closeButton = document.querySelector(".lightbox-close");
    var galleryImages = document.querySelectorAll(".project-gallery img, .jury-gallery img, .podcast-visual img");
    var galleryVideos = document.querySelectorAll(".project-gallery video");

    if (!lightbox || !lightboxImage || !lightboxVideo || !closeButton) {
        return;
    }

    function openLightbox() {
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("lightbox-open");
    }

    function openImage(img) {
        lightboxVideo.pause();
        lightboxVideo.classList.remove("active");
        lightboxVideo.removeAttribute("src");
        lightboxVideo.load();

        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt || "Image du projet";
        lightboxImage.classList.add("active");
        openLightbox();
    }

    function openVideo(video) {
        lightboxImage.classList.remove("active");
        lightboxImage.src = "";
        lightboxImage.alt = "";

        lightboxVideo.src = video.currentSrc || video.src;
        lightboxVideo.classList.add("active");
        openLightbox();
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("lightbox-open");

        lightboxImage.classList.remove("active");
        lightboxImage.src = "";
        lightboxImage.alt = "";

        lightboxVideo.pause();
        lightboxVideo.classList.remove("active");
        lightboxVideo.removeAttribute("src");
        lightboxVideo.load();
    }

    galleryImages.forEach(function (img) {
        img.addEventListener("click", function () {
            openImage(img);
        });
    });

    galleryVideos.forEach(function (video) {
        video.addEventListener("click", function () {
            openVideo(video);
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
