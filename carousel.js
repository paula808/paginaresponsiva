document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const dotsContainer = document.querySelector('.carousel-dots');

    let currentSlideIndex = 0;
    const slideCount = slides.length;
    let slideWidth = slides[0].getBoundingClientRect().width; // Ancho del slide visible
    let resizeTimer; // Para el debounce de resize

    // Crea los puntos de navegación
    const createDots = () => {
        dotsContainer.innerHTML = ''; // Limpiar si ya existen
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => moveToSlide(index));
            dotsContainer.appendChild(dot);
        });
    };

    // Actualiza los puntos de navegación
    const updateDots = () => {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlideIndex);
        });
    };

    // Mueve el carrusel al slide especificado
    const moveToSlide = (targetIndex) => {
        if (targetIndex < 0) {
            targetIndex = slideCount - 1; // Ir al último si es antes del primero
        } else if (targetIndex >= slideCount) {
            targetIndex = 0; // Ir al primero si es después del último
        }

        currentSlideIndex = targetIndex;
        const offset = -currentSlideIndex * slideWidth;
        carouselTrack.style.transform = `translateX(${offset}px)`;
        updateDots();
    };

    // Navegación con botones
    prevButton.addEventListener('click', () => {
        moveToSlide(currentSlideIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        moveToSlide(currentSlideIndex + 1);
    });

    // Actualiza el ancho del slide y la posición del carrusel en caso de redimensionamiento
    const handleResize = () => {
        // Debounce para evitar que se ejecute excesivamente durante el resize
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            slideWidth = slides[0].getBoundingClientRect().width;
            moveToSlide(currentSlideIndex); // Reajusta la posición
        }, 250); // Espera 250ms después de que el usuario deje de redimensionar
    };

    window.addEventListener('resize', handleResize);

    // Inicialización del carrusel
    createDots();
    moveToSlide(0); // Asegura que el carrusel esté en la primera posición al cargar
});
