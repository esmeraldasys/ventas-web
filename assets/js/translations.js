// Variable to store translations
let translations = {};

// Function to change the language
async function changeLanguage(lang) {
    try {
        const response = await fetch(`assets/lang/${lang}.json`);
        if (!response.ok) {
            console.error(`Error loading language file: ${response.statusText}`);
            return;
        }
        translations = await response.json();
        translatePage();
        document.documentElement.lang = lang; // Update the HTML lang attribute
    } catch (error) {
        console.error('Could not load language file:', error);
    }
}

// Function to translate the page, including placeholders
function translatePage() {
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        const translation = getTranslation(key);
        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'LABEL') {
                if(element.placeholder !== undefined) element.placeholder = translation;
                if(element.tagName === 'LABEL') element.textContent = translation;
            } else {
                element.innerHTML = translation;
            }
        }
    });
}

// Helper function to get a nested translation from a key
function getTranslation(key) {
    return key.split('.').reduce((obj, i) => (obj ? obj[i] : null), translations);
}


// Function to inject and setup footer
async function setupFooter() {
    try {
        const response = await fetch('assets/components/_footer.html');
        if(!response.ok) return;
        const footerHTML = await response.text();
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if(footerPlaceholder) {
            footerPlaceholder.innerHTML = footerHTML;
        }
    } catch (error) {
        console.error('Could not load footer:', error);
    }
}


// This function runs once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", async function() {

    await setupFooter(); // Load footer first

    // Set English as default, switch to Spanish if browser is Spanish
    const userLang = navigator.language || navigator.userLanguage; 
    let defaultLang = 'en'; // Default to English
    if (userLang.startsWith('es')) {
        defaultLang = 'es'; // If browser is Spanish, use Spanish
    }
    await changeLanguage(defaultLang); // Load detected or default language

    // Initialize Swiper (only if the element exists)
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

    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800, 
        once: true,    
    });

    // Initialize LightGallery (only if the element exists)
    if (document.getElementById('lightgallery')) {
        lightGallery(document.getElementById('lightgallery'), {
            plugins: [lgZoom, lgThumbnail],
            speed: 500,
            download: false
        });
    }
    
    // Logic for form feedback
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            const feedbackDiv = document.getElementById('form-feedback');
            const successMessage = document.documentElement.lang === 'es' 
                ? '¡Gracias! Tu mensaje ha sido enviado.' 
                : 'Thank you! Your message has been sent.';
            feedbackDiv.innerHTML = `<div class="alert alert-success">${successMessage}</div>`;
            contactForm.reset();
            setTimeout(() => { feedbackDiv.innerHTML = ''; }, 5000);
        });
    }
});

