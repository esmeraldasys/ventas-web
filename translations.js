const translations = {
  es: {
    // ---- Navegación General ----
    navHome: "Inicio",
    navProperties: "Propiedades",
    navAmenities: "Amenidades",
    navContact: "Contacto",
    viewDetails: "Ver Detalles",

    // ---- Página Principal (index.html) ----
    heroTitle1: "Tu Paraíso Frente al Mar te Espera",
    heroSubtitle1: "Descubre un estilo de vida exclusivo en Puerto Peñasco.",
    heroButton1: "Ver Propiedades",
    heroTitle2: "Amenidades de Lujo",
    heroSubtitle2: "Albercas, gimnasio y seguridad 24/7.",
    heroButton2: "Descubrir Amenidades",
    heroTitle3: "Vive en Puerto Peñasco",
    heroSubtitle3: "El destino perfecto para tu nueva vida.",
    heroButton3: "Conocer la Zona",
    propertiesTitle: "Propiedades",
    prop1Title: "Esmeralda Beach Resort",
    prop1Details: "3 Recámaras | 4 Baños | 280 m²",
    prop2Title: "Casa Blanca Golf & Villas",
    prop2Details: "2 Recámaras | 2 Baños | 150 m²",
    prop3Title: "San Sebastian",
    prop3Details: "3 Recámaras | 2.5 Baños | 190 m²",
    amenitiesTitle: "Un Estilo de Vida Incomparable",
    amenity1Title: "Alberca y Río Lento",
    amenity1Desc: "Relájate con vistas espectaculares al Mar de Cortés.",
    amenity2Title: "Gimnasio Equipado",
    amenity2Desc: "Mantente en forma sin salir de casa.",
    amenity3Title: "Seguridad 24/7",
    amenity3Desc: "Vive con total tranquilidad y privacidad.",
    contactTitle: "Solicita Más Información",
    contactSubtitle: "Déjanos tus datos y un asesor se pondrá en contacto contigo.",
    formName: "Nombre Completo",
    formEmail: "Correo Electrónico",
    formPhone: "Número de Teléfono",
    formMessage: "¿En qué propiedad estás interesado?",
    formButton: "Enviar Mensaje",
    footerAddress: "Blvd. Paseo de la Duna, Puerto Peñasco, Sonora, México",
    footerContact: "Teléfono: (555) 123-4567 | Email: ventas@nnaluxury.com",
    footerRights: "© 2025 NNA LUXURY. Todos los derechos reservados.",

    // ---- Páginas de Propiedades (esmeralda.html, casablanca.html) ----
    navAgents: "Agentes",
    propertyTitle: "Villa de Lujo con Vista al Mar",
    featureBeds: "Habitaciones",
    featureBaths: "Baños",
    featureGarages: "Garajes",
    descriptionTitle: "Descripción",
    propertyDescription: "Esta impresionante villa de lujo ofrece vistas panorámicas al mar y está ubicada en una de las zonas más exclusivas. Con un diseño moderno y acabados de alta calidad, esta propiedad es perfecta para quienes buscan confort y estilo.",
    amenitiesListTitle: "Comodidades",
    amenityPool: "Piscina Privada",
    amenityGarden: "Jardín Exuberante",
    amenitySecurity: "Sistema de Seguridad 24/7",
    amenityAC: "Aire Acondicionado Central",
    agentCardTitle: "Contactar al Agente"
  },
  en: {
    // ---- General Navigation ----
    navHome: "Home",
    navProperties: "Properties",
    navAmenities: "Amenities",
    navContact: "Contact",
    viewDetails: "View Details",

    // ---- Main Page (index.html) ----
    heroTitle1: "Your Paradise by the Sea Awaits",
    heroSubtitle1: "Discover an exclusive lifestyle in Puerto Peñasco.",
    heroButton1: "View Properties",
    heroTitle2: "Luxury Amenities",
    heroSubtitle2: "Pools, gym, and 24/7 security.",
    heroButton2: "Discover Amenities",
    heroTitle3: "Live in Puerto Peñasco",
    heroSubtitle3: "The perfect destination for your new life.",
    heroButton3: "Explore the Area",
    propertiesTitle: "Properties",
    prop1Title: "Esmeralda Beach Resort",
    prop1Details: "3 Bedrooms | 4 Bathrooms | 280 m²",
    prop2Title: "Casa Blanca Golf & Villas",
    prop2Details: "2 Bedrooms | 2 Bathrooms | 150 m²",
    prop3Title: "San Sebastian",
    prop3Details: "3 Bedrooms | 2.5 Bathrooms | 190 m²",
    amenitiesTitle: "An Unparalleled Lifestyle",
    amenity1Title: "Pool & Lazy River",
    amenity1Desc: "Relax with spectacular views of the Sea of Cortez.",
    amenity2Title: "Equipped Gym",
    amenity2Desc: "Stay in shape without leaving home.",
    amenity3Title: "24/7 Security",
    amenity3Desc: "Live with total peace of mind and privacy.",
    contactTitle: "Request More Information",
    contactSubtitle: "Leave us your details and an advisor will contact you shortly.",
    formName: "Full Name",
    formEmail: "Email Address",
    formPhone: "Phone Number",
    formMessage: "Which property are you interested in?",
    formButton: "Send Message",
    footerAddress: "Blvd. Paseo de la Duna, Puerto Peñasco, Sonora, Mexico",
    footerContact: "Phone: (555) 123-4567 | Email: sales@nnaluxury.com",
    footerRights: "© 2025 NNA LUXURY. All rights reserved.",

    // ---- Property Pages (esmeralda.html, casablanca.html) ----
    navAgents: "Agents",
    propertyTitle: "Luxury Villa with Ocean View",
    featureBeds: "Bedrooms",
    featureBaths: "Bathrooms",
    featureGarages: "Garages",
    descriptionTitle: "Description",
    propertyDescription: "This stunning luxury villa offers panoramic ocean views and is located in one of the most exclusive areas. With a modern design and high-quality finishes, this property is perfect for those seeking comfort and style.",
    amenitiesListTitle: "Amenities",
    amenityPool: "Private Pool",
    amenityGarden: "Lush Garden",
    amenitySecurity: "24/7 Security System",
    amenityAC: "Central Air Conditioning",
    agentCardTitle: "Contact Agent"
  }
};

const changeLanguage = (lang) => {
  localStorage.setItem('language', lang); // Guarda el idioma seleccionado
  
  document.querySelectorAll('[data-key]').forEach(element => {
    const key = element.getAttribute('data-key');
    if (translations[lang][key]) {
      // Si es un input o textarea, cambia el placeholder
      if(element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translations[lang][key];
      } else {
        element.innerHTML = translations[lang][key];
      }
    }
  });
  
  // Cambia el atributo lang del HTML
  document.documentElement.lang = lang;
};

// Al cargar la página, comprueba si hay un idioma guardado o detecta el del navegador
document.addEventListener('DOMContentLoaded', () => {
  let savedLang = localStorage.getItem('language');

  if (!savedLang) {
    const browserLang = navigator.language || navigator.userLanguage;
    savedLang = browserLang.startsWith('en') ? 'en' : 'es';
  }
  
  changeLanguage(savedLang);
});

