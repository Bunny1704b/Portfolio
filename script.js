document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    const ctaButtons = document.querySelectorAll('.scroll-to-section');
    const skillLevels = document.querySelectorAll('.skill-level');

    // --- Loading Screen Animation ---
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        // Once loading screen is hidden, animate skill bars
        setTimeout(() => {
            animateSkillBars();
        }, 500); // Give a small delay after loading screen hides
    }, 2500); // Adjust this duration for how long you want the loading screen to show

    // --- Navbar Active State & Smooth Scroll ---
    const updateActiveNavItem = () => {
        let currentActiveSectionId = 'hero'; // Default to hero

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset for fixed navbar
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentActiveSectionId = section.id;
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.target === currentActiveSectionId) {
                item.classList.add('active');
            }
        });
    };

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.dataset.target;
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 80, // Adjust for fixed navbar height
                behavior: 'smooth'
            });
            // Update active state immediately on click
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.dataset.target;
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 80, // Adjust for fixed navbar height
                behavior: 'smooth'
            });
            // Also update navbar active state
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.dataset.target === targetId) {
                    item.classList.add('active');
                }
            });
        });
    });

    // --- Intersection Observer for Section Animations & Nav Active State ---
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.3 // Trigger when 30% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                updateActiveNavItem(); // Update active nav item as sections come into view
            } else {
                // Optional: Remove fade-in if you want sections to fade out when scrolled away
                // entry.target.classList.remove('fade-in');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Skill Bar Animation on Scroll ---
    const animateSkillBars = () => {
        skillLevels.forEach(skillBar => {
            const skillPercent = skillBar.style.width;
            skillBar.style.setProperty('--skill-percent', skillPercent); // Set CSS variable
            skillBar.style.width = skillPercent; // Re-apply to trigger animation
        });
    };

    // Initial check for active nav item on load
    updateActiveNavItem();
    window.addEventListener('scroll', updateActiveNavItem);
});