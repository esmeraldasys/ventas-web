// =================================================================================
// SCRIPT PRINCIPAL PARA NNA LUXURY
// Gestiona las traducciones e inicialización de plugins.
// =================================================================================

// Variable global para almacenar las traducciones.
let translations = {};

/**
 * Función global para cambiar el idioma, llamada desde el HTML.
 * @param {string} lang - 'es' o 'en'.
 */
window.changeLanguage = async (lang) => {
    localStorage.setItem('language', lang);
    await loadAndApplyTranslations(lang);
};

/**
 * Carga el archivo JSON del idioma especificado.
 * @param {string} lang - 'es' o 'en'.
 */
async function loadTranslations(lang) {
    try {
        const response = await fetch(`assets/lang/${lang}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        translations = await response.json();
    } catch (error) {
        console.error("No se pudo cargar el archivo de traducción:", error);
    }
}

/**
 * Aplica los textos del objeto 'translations' a los elementos del DOM.
 */
function applyTranslationsToPage() {
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        const translation = key.split('.').reduce((obj, i) => (obj ? obj[i] : null), translations);

        if (translation !== null && translation !== undefined) {
             if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.innerHTML = translation;
            }
        }
    });
}

/**
 * Combina la carga y aplicación de traducciones.
 * @param {string} lang - 'es' o 'en'.
 */
async function loadAndApplyTranslations(lang) {
    document.documentElement.lang = lang; // Actualiza el atributo lang del HTML
    await loadTranslations(lang);
    applyTranslationsToPage();
}

/**
 * Inicializa las librerías de terceros (Swiper, AOS, LightGallery).
 */
function initializePlugins() {
    if (document.querySelector('.mySwiper')) {
        new Swiper(".mySwiper", {
            spaceBetween: 30, centeredSlides: true, effect: "fade",
            autoplay: { delay: 4500, disableOnInteraction: false },
            pagination: { el: ".swiper-pagination", clickable: true },
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        });
    }
    AOS.init({ duration: 800, once: true });
    if (document.getElementById('lightgallery')) {
        lightGallery(document.getElementById('lightgallery'), {
            plugins: [lgZoom, lgThumbnail], speed: 500, download: false
        });
    }
}

/**
 * Configura los manejadores de eventos para los formularios.
 */
function setupForms() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const feedbackDiv = document.getElementById('form-feedback');
            const lang = localStorage.getItem('language') || 'es';
            const successMessage = (lang === 'es') ? '¡Gracias! Tu mensaje ha sido enviado.' : 'Thank you! Your message has been sent.';
            feedbackDiv.innerHTML = `<div class="alert alert-success">${successMessage}</div>`;
            contactForm.reset();
            setTimeout(() => { feedbackDiv.innerHTML = ''; }, 5000);
        });
    }
}

/**
 * Punto de entrada principal que se ejecuta cuando el DOM está listo.
 */
document.addEventListener("DOMContentLoaded", async () => {
    // Lógica para determinar el idioma inicial
    let initialLang = localStorage.getItem('language'); // 1. Revisa si hay un idioma guardado por el usuario.

    if (!initialLang) { // Si el usuario no ha elegido un idioma...
        // 2. Revisa el idioma del navegador.
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('es')) {
            initialLang = 'es'; // Si el navegador está en español, usa español.
        } else {
            initialLang = 'en'; // 3. Para cualquier otro caso, el idioma por defecto será inglés.
        }
    }
    
    // Carga las traducciones según el idioma determinado.
    await loadAndApplyTranslations(initialLang);
    
    // Inicializa los plugins y formularios.
    initializePlugins();
    setupForms();
});

