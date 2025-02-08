document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const notRobotCheckbox = form.querySelector('input[name="not_robot"]');
    const submitButton = form.querySelector('#input-submit');
    const options = document.querySelectorAll(".option");
    const backToTopButton = document.getElementById('back-to-top');
    const optionsContainer = document.querySelector('.options');
    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse events for scrolling
    optionsContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        optionsContainer.classList.add('active');
        startX = e.pageX - optionsContainer.offsetLeft;
        scrollLeft = optionsContainer.scrollLeft;
    });

    optionsContainer.addEventListener('mouseleave', () => {
        isDown = false;
        optionsContainer.classList.remove('active');
    });

    optionsContainer.addEventListener('mouseup', () => {
        isDown = false;
        optionsContainer.classList.remove('active');
    });

    optionsContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - optionsContainer.offsetLeft;
        const walk = (x - startX) * 3; // Scroll-fast
        optionsContainer.scrollLeft = scrollLeft - walk;
    });

    // Touch events for scrolling
    optionsContainer.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - optionsContainer.offsetLeft;
        scrollLeft = optionsContainer.scrollLeft;
    });

    optionsContainer.addEventListener('touchend', () => {
        isDown = false;
    });

    optionsContainer.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - optionsContainer.offsetLeft;
        const walk = (x - startX) * 3; // Scroll-fast
        optionsContainer.scrollLeft = scrollLeft - walk;
    });

    options.forEach(option => {
        let currentImageIndex = 0;
        const images = JSON.parse(option.dataset.images || '[]');

        if (images.length > 0) {
            option.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                option.style.setProperty('--optionBackground', `url('${images[currentImageIndex]}')`);
            });
        }

        option.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                options.forEach(opt => opt.classList.remove("active"));
                option.classList.add("active");
            } else {
                options.forEach(opt => opt.classList.remove("active"));
                option.classList.add("active");
            }
        });
    });

    form.addEventListener('submit', function(event) {
        if (!notRobotCheckbox.checked) {
            event.preventDefault();
            alert('Please confirm that you are not a robot.');
        }
    });

    // Navigation toggle functionality
    const toggle = document.querySelector('#page-nav-toggle');
    const navigation = document.querySelector('.main-navigation');

    toggle.addEventListener('change', function() {
        if (toggle.checked) {
            navigation.style.transform = 'translateX(0)';
        } else {
            navigation.style.transform = 'translateX(100%)';
        }
    });

    // Back to top button functionality
    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
