// Hamburger Menu Logic
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const navLinks = document.querySelectorAll('.navbar-link');

    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            menuBtn.classList.toggle('open');
        });

        // Close menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                sidebar.classList.remove('active');
                menuBtn.classList.remove('open');
            });
        });

        // Close when clicking outside on main content
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.addEventListener('click', () => {
                if (sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                    menuBtn.classList.remove('open');
                }
            });
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {

    // Tab Switching Logic
    const navLinks = document.querySelectorAll('.navbar-link');
    const tabContents = document.querySelectorAll('.tab-content');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetTab = link.getAttribute('data-tab');

            // Update Active Link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Update Active Tab Content
            tabContents.forEach(tab => {
                tab.classList.remove('active');
                if (tab.id === targetTab) {
                    tab.classList.add('active');
                }
            });

            // Scroll to top of content
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Simple Form Submission Feedback (Stub)
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        const submitBtn = contactForm.querySelector('button');
        if (submitBtn) { // Null check
            submitBtn.addEventListener('click', () => {
                alert('Thank you! This is a demonstration. Your message has been "sent" in this prototype.');
                contactForm.reset();
            });
        }
    }

    // Initialize Language
    const savedLang = localStorage.getItem('portfolio_lang') || 'en';
    const langSelect = document.getElementById('lang-selector');
    if (langSelect) langSelect.value = savedLang;
    window.changeLanguage(savedLang);

});

// Global Language Switcher
window.changeLanguage = function (lang) {
    if (!translations) return;

    const dict = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                if (el.hasAttribute('placeholder')) {
                    el.setAttribute('placeholder', dict[key]);
                }
            } else {
                el.textContent = dict[key];
            }
        }
    });

    // Handle RTL for Arabic
    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }

    // Persist
    localStorage.setItem('portfolio_lang', lang);
}
