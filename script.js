/* --- ASHA PANCHAL: EDITORIAL LOGIC --- */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. EXHIBITION LOADER LOGIC
    const loader = document.getElementById('gallery-loader');
    const loaderBar = document.getElementById('loader-bar');
    const loaderPerc = document.getElementById('loader-perc');
    let percentage = 0;

    let loadingInterval = setInterval(() => {
        percentage += Math.floor(Math.random() * 15) + 5; 
        
        if (percentage >= 100) {
            percentage = 100;
            clearInterval(loadingInterval);
            
            setTimeout(() => {
                loader.classList.add('slide-up');
                setTimeout(triggerReveals, 500); 
            }, 600);
        }
        
        loaderBar.style.width = percentage + '%';
        loaderPerc.innerText = percentage + '%';
    }, 150);

    // 2. SCROLL REVEAL ANIMATIONS
    function triggerReveals() {
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.10 });

        reveals.forEach(reveal => observer.observe(reveal));
    }

    // 3. FLOATING CV BUTTON HIDE/SHOW
    const cvBtn = document.getElementById('cv-btn');
    const footer = document.getElementById('contact');
    
    if (cvBtn && footer) {
        window.addEventListener('scroll', () => {
            const footerRect = footer.getBoundingClientRect();
            if(footerRect.top < window.innerHeight) {
                cvBtn.style.opacity = '0';
                cvBtn.style.pointerEvents = 'none';
            } else {
                cvBtn.style.opacity = '1';
                cvBtn.style.pointerEvents = 'auto';
            }
        });
    }

    // 4. NEW: IMAGE LIGHTBOX LOGIC
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const masonryItems = document.querySelectorAll('.masonry-item');

    // Open Lightbox
    masonryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgUrl = item.querySelector('img').src;
            const projectTitle = item.querySelector('h3').innerText;
            
            lightboxImg.src = imgUrl;
            if (lightboxCaption) lightboxCaption.innerText = projectTitle;
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stops the background from scrolling
        });
    });

    // Close Lightbox Function
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restores background scrolling
        
        // Wait for fade-out animation to finish before clearing the image
        setTimeout(() => {
            lightboxImg.src = '';
        }, 400);
    }

    // Close on 'X' click
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    // Close on background click (clicking anywhere outside the image)
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                closeLightbox();
            }
        });
    }

    // Close on 'Escape' key press
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

});