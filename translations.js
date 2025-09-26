// Encapsulamos todo el código en una IIFE para no contaminar el ámbito global
(function() {
  // Variable para almacenar en caché las traducciones cargadas
  let translations = {};

  // Función para obtener un valor de un objeto anidado usando una clave como "nav.home"
  const getNestedTranslation = (obj, key) => {
    return key.split('.').reduce((o, i) => (o ? o[i] : undefined), obj);
  };

  // Función asíncrona para cargar y aplicar el idioma
  const setLanguage = async (lang) => {
    // Si no tenemos las traducciones para este idioma, las cargamos
    if (!translations[lang]) {
      try {
        const response = await fetch(`lang/${lang}.json`);
        if (!response.ok) {
          throw new Error(`Could not load ${lang}.json`);
        }
        translations[lang] = await response.json();
      } catch (error) {
        console.error("Error loading translation file:", error);
        return; // No continuar si el archivo no se pudo cargar
      }
    }

    // Aplicar las traducciones a los elementos
    document.querySelectorAll('[data-key]').forEach(element => {
      const key = element.getAttribute('data-key');
      const translation = getNestedTranslation(translations[lang], key);
      
      if (translation) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translation;
        } else {
          element.innerHTML = translation;
        }
      }
    });

    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
  };

  // Función global para ser llamada desde el HTML
  window.changeLanguage = (lang) => {
    setLanguage(lang);
  };

  // Al cargar la página, determina el idioma inicial
  document.addEventListener('DOMContentLoaded', () => {
    let initialLang = localStorage.getItem('language');

    if (!initialLang) {
      const browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
      initialLang = browserLang.startsWith('es') ? 'es' : 'en';
    }
    
    setLanguage(initialLang);
  });

})();

