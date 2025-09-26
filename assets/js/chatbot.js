// =========================================
// LÓGICA DEL CHATBOT
// =========================================
document.addEventListener("DOMContentLoaded", function() {
    const chatbotButton = document.querySelector('.chatbot-button');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const closeBtn = document.querySelector('.chatbot-close-btn');
    const sendBtn = document.getElementById('chatbot-send-btn');
    const input = document.getElementById('chatbot-input');
    const chatBody = document.querySelector('.chatbot-body');

    // Toggle (abrir/cerrar) la ventana del chat
    if (chatbotButton) {
        chatbotButton.addEventListener('click', () => {
            chatbotWindow.classList.toggle('open');
        });
    }

    // Cerrar la ventana del chat con el botón X
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            chatbotWindow.classList.remove('open');
        });
    }

    // Función para enviar mensajes
    const sendMessage = () => {
        const userMessage = input.value.trim();
        if (userMessage === '') return;

        // Añadir mensaje del usuario al DOM del chat
        appendMessage(userMessage, 'user');
        input.value = '';

        // Simular una pequeña espera y generar la respuesta del bot
        setTimeout(() => {
            getBotResponse(userMessage);
        }, 600);
    };

    // Event listeners para enviar el mensaje
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Función para añadir un mensaje al cuerpo del chat
    function appendMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${type}`;
        messageDiv.textContent = message;
        chatBody.appendChild(messageDiv);
        // Scroll automático al último mensaje
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Función principal con la "inteligencia" del bot
    function getBotResponse(message) {
        const lowerCaseMessage = message.toLowerCase();
        let botMessage = "Lo siento, no entiendo tu pregunta. Puedo darte información sobre 'Esmeralda Beach Resort', 'Casa Blanca Golf & Villas', 'amenidades' o 'contacto'.";

        if (lowerCaseMessage.includes('esmeralda')) {
            botMessage = "Esmeralda Beach Resort es una de nuestras propiedades de lujo. Ofrece condominios de 3 recámaras y 4 baños, con 280 m² y espectaculares vistas al Mar de Cortés. ¿Te gustaría saber más o contactar a un agente?";
        } else if (lowerCaseMessage.includes('casa blanca')) {
            botMessage = "Casa Blanca Golf & Villas cuenta con propiedades exclusivas de 2 recámaras y 2 baños en 150 m², ubicadas en una de las zonas más prestigiosas de Puerto Peñasco. Es ideal para los amantes del golf.";
        } else if (lowerCaseMessage.includes('san sebastian')) {
            botMessage = "San Sebastian ofrece amplias unidades familiares de 3 recámaras y 2.5 baños en 190 m². Es una excelente opción para la comodidad de toda la familia.";
        } else if (lowerCaseMessage.includes('amenidades') || lowerCaseMessage.includes('servicios')) {
            botMessage = "Ofrecemos amenidades de lujo como albercas, río lento, gimnasio totalmente equipado y seguridad 24/7 para tu tranquilidad. Todo con vistas espectaculares al mar.";
        } else if (lowerCaseMessage.includes('contacto') || lowerCaseMessage.includes('agente') || lowerCaseMessage.includes('informacion')) {
            botMessage = "Claro, puedes contactarnos al teléfono (555) 123-4567 o al correo ventas@nnaluxury.com. También puedes dejarnos tus datos en el formulario de la sección de 'Contacto'.";
        } else if (lowerCaseMessage.includes('gracias')) {
            botMessage = "¡De nada! Estoy aquí para ayudarte cuando lo necesites.";
        } else if (lowerCaseMessage.includes('hola') || lowerCaseMessage.includes('buenos dias')) {
            botMessage = "¡Hola! ¿En qué puedo ayudarte hoy?";
        }

        // Añadir la respuesta del bot al DOM del chat
        appendMessage(botMessage, 'assistant');
    }
});
