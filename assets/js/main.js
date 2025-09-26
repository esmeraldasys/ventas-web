// Variable global para almacenar las traducciones
let translations = {};

// Función para cambiar el idioma, accesible globalmente
async function changeLanguage(lang) {
    localStorage.setItem('language', lang); // Guarda el idioma seleccionado
    await loadTranslations(lang);
}

// Carga el archivo de traducción y actualiza el DOM
async function loadTranslations(lang) {
    try {
        const response = await fetch(`assets/lang/${lang}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        translations = await response.json();
        translatePage();
    } catch (error) {
        console.error("Could not load translation file:", error);
    }
}

// Aplica las traducciones a los elementos con data-key
function translatePage() {
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        const translation = getTranslation(key);
        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                // Para inputs y textareas, actualiza el placeholder si no hay una label
                if (!element.labels || element.labels.length === 0) {
                   element.placeholder = translation;
                }
            } else {
                element.innerHTML = translation;
            }
        }
    });
     // Actualiza las labels de los form-floating
    document.querySelectorAll('.form-floating label').forEach(label => {
        const key = label.getAttribute('data-key');
        const translation = getTranslation(key);
        if(translation) {
            label.textContent = translation;
        }
    });
}

// Función auxiliar para obtener una traducción anidada (ej: "mainPage.hero.title")
function getTranslation(key) {
    return key.split('.').reduce((obj, i) => (obj ? obj[i] : null), translations);
}


// Se ejecuta cuando el contenido del DOM está completamente cargado
document.addEventListener("DOMContentLoaded", async function() {

    // --- 1. CARGAR COMPONENTES (HEADER Y FOOTER) ---
    const loadComponents = async () => {
        const headerPlaceholder = document.getElementById('header-placeholder');
        const footerPlaceholder = document.getElementById('footer-placeholder');

        if (headerPlaceholder) {
            try {
                const response = await fetch('assets/components/_header.html');
                headerPlaceholder.innerHTML = await response.text();
            } catch (error) {
                console.error('Error loading header:', error);
            }
        }

        if (footerPlaceholder) {
            try {
                const response = await fetch('assets/components/_footer.html');
                footerPlaceholder.innerHTML = await response.text();
            } catch (error) {
                console.error('Error loading footer:', error);
            }
        }
    };

    // --- 2. INICIALIZAR PLUGINS (Swiper, AOS, etc.) ---
    const initPlugins = () => {
        // Inicializar Swiper (solo si existe)
        if (document.querySelector('.mySwiper')) {
            new Swiper(".mySwiper", {
                spaceBetween: 30,
                centeredSlides: true,
                effect: "fade",
                autoplay: { delay: 4000, disableOnInteraction: false },
                pagination: { el: ".swiper-pagination", clickable: true },
                navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
            });
        }

        // Inicializar AOS (Animate on Scroll)
        AOS.init({ duration: 800, once: true });

        // Inicializar LightGallery (solo si existe)
        if (document.getElementById('lightgallery')) {
            lightGallery(document.getElementById('lightgallery'), {
                plugins: [lgZoom, lgThumbnail],
                speed: 500,
                download: false
            });
        }
    };

    // --- 3. MANEJAR FORMULARIOS ---
    const handleForms = () => {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const feedbackDiv = document.getElementById('form-feedback');
                const successMessage = (localStorage.getItem('language') === 'es')
                    ? '¡Gracias! Tu mensaje ha sido enviado.'
                    : 'Thank you! Your message has been sent.';
                
                feedbackDiv.innerHTML = `<div class="alert alert-success">${successMessage}</div>`;
                contactForm.reset();
                setTimeout(() => { feedbackDiv.innerHTML = ''; }, 5000);
            });
        }
    };

    // --- EJECUCIÓN ---
    await loadComponents(); // Espera a que se carguen los componentes primero

    // Determina el idioma (guardado o por defecto 'es') y carga las traducciones
    const selectedLang = localStorage.getItem('language') || 'es';
    await changeLanguage(selectedLang);
    
    initPlugins(); // Luego inicializa los plugins
    handleForms(); // Y finalmente, configura los formularios
});
