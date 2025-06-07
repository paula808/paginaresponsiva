// js/carousel.js

document.addEventListener('DOMContentLoaded', () => {
    const carouselContainers = document.querySelectorAll('.product-carousel-container');

    carouselContainers.forEach(container => {
        const carousel = container.querySelector('.product-carousel');
        const images = carousel.querySelectorAll('img');
        const prevBtn = container.querySelector('.carousel-button.prev');
        const nextBtn = container.querySelector('.carousel-button.next');

        let currentIndex = 0;
        const totalImages = images.length;

        if (totalImages === 0) return; // No hay imágenes para el carrusel

        const updateCarousel = () => {
            const imageWidth = images[0].clientWidth; // Obtener el ancho de la primera imagen
            carousel.style.transform = `translateX(${-currentIndex * imageWidth}px)`;
        };

        const goToNext = () => {
            currentIndex = (currentIndex + 1) % totalImages;
            updateCarousel();
        };

        const goToPrev = () => {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateCarousel();
        };

        // Event Listeners para los botones
        if (prevBtn) {
            prevBtn.addEventListener('click', goToPrev);
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', goToNext);
        }

        // Para asegurar que el carrusel se ajuste si la ventana cambia de tamaño
        window.addEventListener('resize', updateCarousel);

        // Inicializar el carrusel
        updateCarousel();
    });
});