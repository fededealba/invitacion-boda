document.addEventListener('DOMContentLoaded', () => {
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const envelope = document.querySelector('.envelope');
    const scrollArrow = document.getElementById('scrollArrow');
    const card1 = document.getElementById('card1');
    const card2 = document.getElementById('card2');
    const card3 = document.getElementById('card3');
    const navButtons = document.querySelectorAll('.nav-btn');

    let currentCard = card1;

    // Navigation button functionality
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
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

    // Swipe functionality
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    const cardContainer = document.getElementById('cardContainer');
    const minSwipeDistance = 50;

    cardContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, false);

    cardContainer.addEventListener('touchend', (e) => {
        // Don't swipe if we're clicking on a link
        if (e.target.closest('a')) {
            return;
        }

        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;

        const swipeDistanceX = touchEndX - touchStartX;
        const swipeDistanceY = Math.abs(touchEndY - touchStartY);

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

});
