document.addEventListener('DOMContentLoaded', () => {
    // Prevent default touch behavior on mobile to allow custom swipe logic
    document.addEventListener('touchmove', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
        }
    }, { passive: false });

    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const envelope = document.querySelector('.envelope');
    const scrollArrow = document.getElementById('scrollArrow');
    const swipeArrow = document.getElementById('swipeArrow');
    const card1 = document.getElementById('card1');
    const card2 = document.getElementById('card2');
    const card3 = document.getElementById('card3');
    const navButtons = document.querySelectorAll('.nav-btn');

    let currentCard = card1;
    let isTransitioning = false;

    // Navigation button functionality
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (isTransitioning) return;
            const targetCardId = button.getAttribute('data-card');
            const targetCard = document.getElementById(targetCardId);

            if (targetCard) {
                switchCard(targetCard);
                updateActiveButton(button);
            }
        });
    });

    function updateActiveButton(activeBtn) {
        navButtons.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    function updateActiveButtonByCard(cardId) {
        navButtons.forEach(btn => {
            if (btn.getAttribute('data-card') === cardId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Envelope click functionality (only works when clicking the envelope itself)
    let envelopeTouchStartTime = 0;
    let envelopeTouchStartX = 0;
    let envelopeTouchStartY = 0;
    let envelopeWasTapped = false;

    if (envelopeWrapper) {
        envelopeWrapper.addEventListener('touchstart', (e) => {
            if (isTransitioning) return;
            envelopeTouchStartTime = Date.now();
            envelopeTouchStartX = e.changedTouches[0].clientX;
            envelopeTouchStartY = e.changedTouches[0].clientY;
            envelopeWasTapped = false;
        }, false);

        envelopeWrapper.addEventListener('touchend', (e) => {
            // Only toggle envelope if we're on card1 and not mid-animation
            if (currentCard === card1 && !isTransitioning) {
                const touchDuration = Date.now() - envelopeTouchStartTime;
                const touchEndX = e.changedTouches[0].clientX;
                const touchEndY = e.changedTouches[0].clientY;
                const touchMoveX = Math.abs(touchEndX - envelopeTouchStartX);
                const touchMoveY = Math.abs(touchEndY - envelopeTouchStartY);

                // Only toggle if it was a quick tap without movement
                if (touchDuration <= 300 && touchMoveX <= 30 && touchMoveY <= 30) {
                    e.preventDefault();
                    e.stopPropagation();
                    envelopeWasTapped = true;
                    envelopeWrapper.classList.toggle('open');
                }
            }
        }, false);

        // Desktop click support
        envelopeWrapper.addEventListener('click', (e) => {
            if (currentCard === card1 && !envelopeWasTapped && !isTransitioning) {
                // Don't trigger if clicking navigation buttons or arrows (though they are outside now)
                if (e.target.closest('.nav-btn') || e.target.closest('.swipe-arrow') || e.target.closest('.scroll-arrow')) return;

                e.preventDefault();
                e.stopPropagation();
                envelopeWrapper.classList.toggle('open');
            }
            envelopeWasTapped = false;
        });
    }

    function switchCard(newCard) {
        if (isTransitioning || currentCard === newCard) return;

        isTransitioning = true;
        const oldCard = currentCard;

        // Flip out current card
        oldCard.classList.add('flipping-out');
        oldCard.classList.remove('active');

        // Hide envelope when leaving card1
        if (oldCard === card1 && newCard !== card1) {
            envelope.classList.add('hidden');
            envelopeWrapper.classList.remove('open');
        }

        // Show envelope when returning to card1 (but keep it closed)
        if (newCard === card1) {
            envelope.classList.remove('hidden');
        }

        // Use transitionend for reliable timing
        const handleTransitionEnd = () => {
            oldCard.classList.remove('flipping-out');
            newCard.classList.add('active');
            currentCard = newCard;
            isTransitioning = false;
            oldCard.removeEventListener('transitionend', handleTransitionEnd);
        };

        oldCard.addEventListener('transitionend', handleTransitionEnd);

        // Fallback timeout in case transitionend doesn't fire
        setTimeout(() => {
            if (isTransitioning) {
                handleTransitionEnd();
            }
        }, 700);
    }

    // Swipe functionality (mobile only)
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    const cardContainer = document.getElementById('cardContainer');
    const minSwipeDistance = 20;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].clientX;
        touchStartY = e.changedTouches[0].clientY;
    }, false);

    document.addEventListener('touchend', (e) => {
        // Don't swipe if we're clicking on a link or mid-transition or scrolling
        if (e.target.closest('a') || isTransitioning) {
            return;
        }

        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;

        const swipeDistanceX = touchEndX - touchStartX;
        const swipeDistanceY = Math.abs(touchEndY - touchStartY);

        // Hide swipe arrow on any touch interaction
        if (swipeArrow && Math.abs(swipeDistanceX) > 10) {
            swipeArrow.classList.add('hidden');
        }

        // Only register horizontal swipes (ignore if vertical swipe is dominant)
        if (Math.abs(swipeDistanceX) > minSwipeDistance && swipeDistanceY < Math.abs(swipeDistanceX)) {
            if (swipeDistanceX < 0) {
                // Swipe left - go to next card
                if (currentCard === card1) {
                    switchCard(card2);
                    updateActiveButtonByCard('card2');
                } else if (currentCard === card2) {
                    switchCard(card3);
                    updateActiveButtonByCard('card3');
                }
            } else {
                // Swipe right - go to previous card
                if (currentCard === card3) {
                    switchCard(card2);
                    updateActiveButtonByCard('card2');
                } else if (currentCard === card2) {
                    switchCard(card1);
                    updateActiveButtonByCard('card1');
                }
            }
        }
    }, false);

    // Scroll-triggered animations (desktop only)
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {
            if (window.innerWidth <= 768) return;

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
                // Phase 3: Show card3 at 180% scroll
                switchCard(card3);
                updateActiveButtonByCard('card3');
            } else if (scrollPosition > windowHeight * 1.0) {
                // Phase 2: Show card2 at 100% scroll
                switchCard(card2);
                updateActiveButtonByCard('card2');
            } else {
                // Initial state: Show card1
                switchCard(card1);
                updateActiveButtonByCard('card1');
            }
        }, 10);
    });

});
