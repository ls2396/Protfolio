(function($) { 
    "use strict";

    var app = function () {
        var body, menu, header, headerWrapper, logoLink, navButWrap, menuLines, init;

        init = function init() {
            body = document.querySelector('body');
            menu = document.querySelector('.menu-icon');
            header = document.querySelector('.header');
            headerWrapper = document.querySelector('.header-wrapper');
            logoLink = document.querySelector('.logo-wrap a');
            navButWrap = document.querySelector('.nav-but-wrap');
            menuLines = document.querySelectorAll('.menu-icon_line');
            applyListeners();
        };

        var applyListeners = function applyListeners() {
            menu.addEventListener('click', function () {
                toggleClass(body, 'nav-active');
                toggleHeaderStyles();
            });
        };

        var toggleClass = function toggleClass(element, stringClass) {
            if (element.classList.contains(stringClass)) {
                element.classList.remove(stringClass);
            } else {
                element.classList.add(stringClass);
            }
        };

        var toggleHeaderStyles = function toggleHeaderStyles() {
            var isActive = body.classList.contains('nav-active');

            if (isActive) {
                headerWrapper.classList.add('active'); 
                header.style.borderBottom = '1px solid var(--mainColor)';
                logoLink.style.color = 'var(--mainColor)';
                navButWrap.style.borderLeft = '1px solid var(--mainColor)';
                menuLines.forEach(line => {
                    line.style.backgroundColor = 'var(--mainColor)';
                });
            } else {
                headerWrapper.classList.remove('active');
                header.style.borderBottom = '';
                logoLink.style.color = '';
                navButWrap.style.borderLeft = '';
                menuLines.forEach(line => {
                    line.style.backgroundColor = '';
                });
            }
        };

        init();
    }();
})(jQuery);
