document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navContent = document.getElementById('nav-content');

    if (navToggle && navContent) {
        navToggle.addEventListener('click', () => {
            navContent.classList.toggle('hidden');
            navContent.classList.toggle('block');
            navContent.classList.toggle('w-full');
        });
    }

    // Certification Hover Logic
    const certificationItems = document.querySelectorAll('.certification-item');
    const certificationModal = document.getElementById('certification-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');

    certificationItems.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            const imgSrc = item.getAttribute('data-img');
            const imgTitle = item.getAttribute('data-title');

            modalImage.src = imgSrc;
            modalImage.alt = imgTitle;
            modalTitle.textContent = imgTitle;

            // Position the modal near the hovered item
            const itemRect = item.getBoundingClientRect();
            const modalRect = certificationModal.getBoundingClientRect();

            let top = itemRect.top + window.scrollY + itemRect.height / 2;
            let left = itemRect.right + window.scrollX + 20; // 20px to the right of the item

            // Adjust if modal goes off-screen to the right
            if (left + modalRect.width > window.innerWidth + window.scrollX) {
                left = itemRect.left + window.scrollX - modalRect.width - 20; // To the left
            }

            // Adjust if modal goes off-screen to the top
            if (top - modalRect.height / 2 < window.scrollY) {
                top = window.scrollY + modalRect.height / 2 + 10; // 10px from top
            }

            // Adjust if modal goes off-screen to the bottom
            if (top + modalRect.height / 2 > window.innerHeight + window.scrollY) {
                top = window.innerHeight + window.scrollY - modalRect.height / 2 - 10; // 10px from bottom
            }

            certificationModal.style.top = `${top}px`;
            certificationModal.style.left = `${left}px`;

            certificationModal.classList.remove('hidden');
        });

        item.addEventListener('mouseleave', () => {
            certificationModal.classList.add('hidden');
        });
    });
});