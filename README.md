# Invitación Boda Federico & Hélène

Digital wedding invitation for Federico & Hélène's celebration in Tequisquiapan, Mexico.

## Overview

This is a responsive, interactive web invitation built with vanilla HTML, CSS, and JavaScript. It features:

*   **3D Card Flip Animation:** Smooth CSS3 transforms for a realistic envelope and card experience.
*   **Mobile-Optimized:** Responsive design ensuring a great experience on all devices.
*   **High Performance:**
    *   Assets converted to **WebP** for fast loading.
    *   Compressed PDF documents.
    *   GPU-accelerated animations.
*   **Interactive Venue Map:** overlay buttons on Card 2 linking directly to Google Maps. assets.

## Project Structure

```
├── index.html      # Main entry point using semantic HTML
├── style.css       # Custom styles with animation definitions
├── script.js       # Logic for 3D navigation, swipe gestures, and scroll effects
└── assets/         # Optimized images (backgrounds, cards, envelope)
```

## Setup & Running

No build process is required. You can run this directly in any browser.

To test locally with a server (recommended for testing loading states):

```bash
# Using Python
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## key Features

1.  **3D Card Navigation:**
    *   Click navigation numbers or scroll to flip through cards.
    *   Mobile users can swipe left/right.

2.  **Envelope Animation:**
    *   Tap/Click the envelope to "open" it (flies away).
    *   Includes collision detection to prevent accidental swipes while tapping.

3.  **Performance:**
    *   Background images are sized appropriately for desktop (2560px) and mobile (1200px).
    *   Critical assets are preloaded; off-screen assets are lazy-loaded.
    *   Animations use `will-change` and hardware acceleration for 60fps performance.

## Deployment

This site is static and can be deployed anywhere (GitHub Pages, Netlify, Vercel).

**GitHub Pages:**
1.  Go to Settings > Pages.
2.  Select the `main` branch and `/` root folder.
3.  Save.
