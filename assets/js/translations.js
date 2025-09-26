(function() {
    // Función para obtener un valor anidado de un objeto
    function getNestedValue(obj, path) {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    }

    async function loadTranslations(lang) {
        try {
            const response = await fetch(`assets/lang/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Could not load ${lang}.json`);
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            // Cargar idioma por defecto (inglés) en caso de error
            const response = await fetch(`assets/lang/en.json`);
            return await response.json();
        }
    }

    async function applyTranslations(lang) {
        const translations = await loadTranslations(lang);
        
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            const translation = getNestedValue(translations, key);
            
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.innerHTML = translation;
                }
            }
        });
        
        document.documentElement.lang = lang;
    }
    
    // Función global para cambiar de idioma desde el HTML
    window.changeLanguage = (lang) => {
        localStorage.setItem('language', lang);
        applyTranslations(lang);
    };

    // Lógica que se ejecuta al cargar la página
    document.addEventListener('DOMContentLoaded', () => {
        let initialLang = localStorage.getItem('language');

        if (!initialLang) {
            const browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
            initialLang = browserLang.startsWith('es') ? 'es' : 'en';
        }
        
        applyTranslations(initialLang);
    });

})();

