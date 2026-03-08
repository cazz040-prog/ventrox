(function () {
    'use strict';

    /* Scroll to hash anchor (e.g. #contact-form) on page load */
    function scrollToHash() {
        var hash = window.location.hash;
        if (hash) {
            var target = document.querySelector(hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', scrollToHash);
    } else {
        scrollToHash();
    }
    window.addEventListener('hashchange', scrollToHash);

    /* Site header – mobile menu (off-canvas drawer + backdrop) */
    const burger = document.querySelector('.site-header__burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuClose = document.querySelector('.menu-close');
    const backdrop = document.getElementById('mobile-drawer-backdrop');

    if (burger && mobileMenu) {
        function setMenuOpen(open) {
            burger.classList.toggle('is-open', open);
            mobileMenu.classList.toggle('open', open);
            if (backdrop) {
                backdrop.classList.toggle('is-open', open);
                backdrop.setAttribute('aria-hidden', !open);
            }
            burger.setAttribute('aria-expanded', open);
            burger.setAttribute('aria-label', open ? 'Close menu' : 'Toggle menu');
            document.documentElement.classList.toggle('menu-open', open);
            document.body.classList.toggle('menu-open', open);
        }

        burger.addEventListener('click', function () {
            setMenuOpen(!mobileMenu.classList.contains('open'));
        });

        if (menuClose) {
            menuClose.addEventListener('click', function () {
                setMenuOpen(false);
            });
        }

        if (backdrop) {
            backdrop.addEventListener('click', function () {
                setMenuOpen(false);
            });
        }

        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                setMenuOpen(false);
            });
        });
    }

    /* Technology section – attribute line entrance animation (once on scroll into view) */
    const technologySection = document.querySelector('.technology-section');
    if (technologySection && 'IntersectionObserver' in window) {
        const techObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in-view');
                    techObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        techObserver.observe(technologySection);
    } else if (technologySection) {
        technologySection.classList.add('is-in-view');
    }

    /* Expertise section scroll animation */
    const expertiseCards = document.querySelectorAll('.expertise-card[data-animate]');
    if (expertiseCards.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

        expertiseCards.forEach(function (card) {
            observer.observe(card);
        });
    } else if (expertiseCards.length) {
        expertiseCards.forEach(function (card) {
            card.classList.add('is-visible');
        });
    }
})();
