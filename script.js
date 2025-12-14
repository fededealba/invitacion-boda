document.addEventListener('DOMContentLoaded', () => {
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const envelope = document.querySelector('.envelope');
    const scrollArrow = document.getElementById('scrollArrow');
    const card1 = document.getElementById('card1');
    const card2 = document.getElementById('card2');
    const card3a = document.getElementById('card3a');

    let currentCard = card1;

    // Envelope click functionality (only works when clicking the envelope itself)
    if (envelope) {
        const toggleEnvelope = (e) => {
            // Only toggle envelope if we're on card1
            if (currentCard === card1) {
                e.preventDefault();
                e.stopPropagation();
                envelopeWrapper.classList.toggle('open');
            }
        };

        // Add both click and touchend events for better mobile support
        envelope.addEventListener('click', toggleEnvelope);
        envelope.addEventListener('touchend', toggleEnvelope);
    }

    function switchCard(newCard) {
        if (currentCard !== newCard) {
            // Flip out current card
            currentCard.classList.add('flipping-out');
            currentCard.classList.remove('active');

            // Flip in new card after a short delay
            setTimeout(() => {
                currentCard.classList.remove('flipping-out');
                newCard.classList.add('active');
                currentCard = newCard;
            }, 400);
        }
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

            // Phase 1: Hide envelope at 30% scroll
            if (scrollPosition > windowHeight * 0.3) {
                envelope.classList.add('hidden');
            } else {
                envelope.classList.remove('hidden');
            }

            // Determine which card to show based on scroll position
            if (scrollPosition > windowHeight * 1.8) {
                // Phase 3: Show card3a at 180% scroll
                switchCard(card3a);
            } else if (scrollPosition > windowHeight * 1.0) {
                // Phase 2: Show card2 at 100% scroll
                switchCard(card2);
            } else {
                // Initial state: Show card1
                switchCard(card1);
            }
        }, 10);
    });
});
