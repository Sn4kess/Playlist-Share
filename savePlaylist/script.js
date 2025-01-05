let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');

// Função para pausar a música atual
function stopMusic() {
    const iframe = slides[currentSlide].querySelector('iframe');
    const src = iframe.src;
    iframe.src = ''; // Remove o src para pausar a música
    iframe.src = src; // Recarrega o iframe para iniciar a música novamente
}

// Atualiza os slides visíveis
function updateSlides() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentSlide) {
            slide.classList.add('active');
        }
    });
}

// Avança para o próximo slide
function nextSlide() {
    stopMusic(); // Pausa a música imediatamente
    currentSlide = (currentSlide + 1) % slides.length; // Vai para o próximo slide, se chegar no final, reinicia
    updateSlides();
}

// Volta para o slide anterior
function prevSlide() {
    stopMusic(); // Pausa a música imediatamente
    currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Vai para o slide anterior
    updateSlides();
}

// Inicia o carrossel mostrando o primeiro slide
updateSlides();
