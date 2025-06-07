// script.js

document.addEventListener('DOMContentLoaded', () => {
    const slideInElements = document.querySelectorAll('.slide-in-element');

    const checkVisibility = () => {
        slideInElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const viewportHeight = window.innerHeight;

            // Define cuándo el elemento debe empezar a aparecer (ajusta el 0.8 según necesites)
            // Cuando la parte superior del elemento entra en el 80% inferior del viewport
            const shouldBeVisible = elementTop < viewportHeight * 0.95 && elementBottom > viewportHeight * 0.05;

            if (shouldBeVisible) {
                element.classList.add('is-visible');
            } else {
                // Opcional: Si quieres que la animación se revierta al salir de vista
                // Comenta la siguiente línea si solo quieres que aparezcan una vez
                element.classList.remove('is-visible');
            }
        });
    };

    // Ejecutar al cargar la página y al hacer scroll
    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Ejecutar al cargar para elementos ya visibles en el viewport inicial
});