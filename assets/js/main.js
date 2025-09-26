// Función para cargar componentes HTML reutilizables (header y footer)
const loadComponent = (selector, url) => {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.querySelector(selector).innerHTML = data;
        })
        .catch(error => console.error(`Error loading component from ${url}:`, error));
};

// Se ejecuta cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Cargar header y footer en sus contenedores
    loadComponent('#header-placeholder', '_header.html');
    loadComponent('#footer-placeholder', '_footer.html');

    // Inicializar AOS (Animate on Scroll)
    AOS.init({
        duration: 800, 
        once: true,    
    });

    // Inicializar Swiper (solo si el elemento .mySwiper existe en la página)
    if (document.querySelector('.mySwiper')) {
        new Swiper(".mySwiper", {
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

    // Inicializar lightGallery (solo si el elemento #lightgallery existe en la página)
    const galleryElement = document.getElementById('lightgallery');
    if (galleryElement) {
        lightGallery(galleryElement, {
            plugins: [lgZoom, lgThumbnail],
            speed: 500,
            download: false
        });
    }
});
