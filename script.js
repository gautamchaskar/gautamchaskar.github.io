document.addEventListener('DOMContentLoaded', () => {
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

    // LinkedIn Carousel Logic
    const carouselItems = document.querySelectorAll('[data-carousel-item]');
    const prevButton = document.querySelector('[data-carousel-prev]');
    const nextButton = document.querySelector('[data-carousel-next]');
    const indicatorsContainer = document.querySelector('[data-carousel-indicators]'); // Assuming you'll add this attribute to the indicators div

    let currentItem = 0;
    const totalItems = carouselItems.length;

    function showItem(index) {
        carouselItems.forEach((item, i) => {
            if (i === index) {
                item.classList.remove('translate-x-full', '-translate-x-full');
                item.classList.add('translate-x-0', 'z-20');
            } else if (i < index) {
                item.classList.remove('translate-x-0', 'z-20');
                item.classList.add('-translate-x-full', 'z-10');
            } else {
                item.classList.remove('translate-x-0', 'z-20');
                item.classList.add('translate-x-full', 'z-10');
            }
        });
        updateIndicators(index);
    }

    function nextItem() {
        currentItem = (currentItem + 1) % totalItems;
        showItem(currentItem);
    }

    function prevItem() {
        currentItem = (currentItem - 1 + totalItems) % totalItems;
        showItem(currentItem);
    }

    function updateIndicators(activeIndex) {
        if (indicatorsContainer) {
            Array.from(indicatorsContainer.children).forEach((indicator, i) => {
                if (i === activeIndex) {
                    indicator.classList.add('bg-blue-500');
                    indicator.classList.remove('bg-gray-600', 'hover:bg-gray-500');
                } else {
                    indicator.classList.remove('bg-blue-500');
                    indicator.classList.add('bg-gray-600', 'hover:bg-gray-500');
                }
            });
        }
    }

    if (prevButton && nextButton && carouselItems.length > 0) {
        prevButton.addEventListener('click', prevItem);
        nextButton.addEventListener('click', nextItem);

        // Initialize indicators
        if (indicatorsContainer) {
            Array.from(indicatorsContainer.children).forEach((indicator, i) => {
                indicator.addEventListener('click', () => {
                    currentItem = i;
                    showItem(currentItem);
                });
            });
        }

        showItem(currentItem); // Show the first item initially
    }
});