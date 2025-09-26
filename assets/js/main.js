document.addEventListener("DOMContentLoaded", function() {
    // Cargar Header (Ruta Corregida)
    fetch('_header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        });

    // Cargar Footer (Ruta Corregida)
    fetch('_footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });

    // Inicializar Swiper (solo si existe el elemento)
    if (document.querySelector('.mySwiper')) {
        var swiper = new Swiper(".mySwiper", {
            spaceBetween: 30,
            centeredSlides: true,
            effect: "fade",
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }

    // Inicializar AOS (Animate on Scroll)
    AOS.init({
        duration: 800, 
        once: true,    
    });

    // Inicializar LightGallery (solo si existe el elemento)
    if (document.getElementById('lightgallery')) {
        lightGallery(document.getElementById('lightgallery'), {
            plugins: [lgZoom, lgThumbnail],
            speed: 500,
            download: false
        });
    }
});
