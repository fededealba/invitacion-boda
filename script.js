document.addEventListener('DOMContentLoaded', () => {
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const envelope = document.querySelector('.envelope');
    const scrollArrow = document.getElementById('scrollArrow');
    const card1 = document.getElementById('card1');
    const card2 = document.getElementById('card2');
    const card3a = document.getElementById('card3a');
    const card3b = document.getElementById('card3b');

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

            // Phase 1: Hide envelope at 20% scroll
            if (scrollPosition > windowHeight * 0.2) {
                envelope.classList.add('hidden');
            } else {
                envelope.classList.remove('hidden');
            }

            // Determine which card to show based on scroll position
            if (scrollPosition > windowHeight * 1.2) {
                // Phase 4: Show card3b at 120% scroll
                card1.classList.remove('active');
                card2.classList.remove('active');
                card3a.classList.remove('active');
                card3b.classList.add('active');
            } else if (scrollPosition > windowHeight * 0.8) {
                // Phase 3: Show card3a at 80% scroll
                card1.classList.remove('active');
                card2.classList.remove('active');
                card3a.classList.add('active');
                card3b.classList.remove('active');
            } else if (scrollPosition > windowHeight * 0.5) {
                // Phase 2: Show card2 at 50% scroll
                card1.classList.remove('active');
                card2.classList.add('active');
                card3a.classList.remove('active');
                card3b.classList.remove('active');
            } else {
                // Initial state: Show card1
                card1.classList.add('active');
                card2.classList.remove('active');
                card3a.classList.remove('active');
                card3b.classList.remove('active');
            }
        }, 10);
    });
});
