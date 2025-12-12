document.addEventListener('DOMContentLoaded', () => {
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const cardFlip = document.getElementById('cardFlip');
    const envelope = document.querySelector('.envelope');
    const scrollArrow = document.getElementById('scrollArrow');

    // Envelope click functionality
    if (envelopeWrapper) {
        envelopeWrapper.addEventListener('click', () => {
            envelopeWrapper.classList.toggle('open');
        });
    }

    // Scroll-triggered animations
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;

            // Hide arrow when user starts scrolling
            if (scrollPosition > 10) {
                scrollArrow.classList.add('hidden');
            } else {
                scrollArrow.classList.remove('hidden');
            }

            // Phase 1: Hide envelope when scrolled down about 20% of viewport height
            if (scrollPosition > windowHeight * 0.2) {
                envelope.classList.add('hidden');
            } else {
                envelope.classList.remove('hidden');
                cardFlip.classList.remove('flipped');
            }

            // Phase 2: Flip card when scrolled down about 50% of viewport height
            // (after envelope is gone)
            if (scrollPosition > windowHeight * 0.5) {
                cardFlip.classList.add('flipped');
            }
        }, 10);
    });
});
