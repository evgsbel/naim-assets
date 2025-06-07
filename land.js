/*** new main ***/

class FeaturesSlider {
    constructor() {
        this.items = document.querySelectorAll('.js-feature-item');
        this.images = document.querySelectorAll('.n-features__image');
        this.dotsContainer = document.querySelector('.slider-dots');
        this.currentIndex = 2;
        this.autoScrollInterval = null;
        this.autoScrollDelay = 5000;
        this.isMobile = window.innerWidth <= 992;

        this.init();
        this.startAutoScroll();
        this.updateSlides();
        this.setupResizeListener();
    }

    init() {
        // Клик по элементам
        this.items.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.resetAutoScroll();
                this.goToSlide(index);
            });
        });

        // Создаем dots если мобильная версия
        if (this.isMobile) {
            this.createDots();
        }
    }

    createDots() {
        this.dotsContainer.innerHTML = ''; // Очищаем перед созданием
        this.items.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === this.currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
    }

    goToSlide(index) {
        if (index === this.currentIndex) return;
        this.currentIndex = index;
        this.updateSlides();
    }

    updateSlides() {
        // Обновляем описания
        this.items.forEach((item, i) => {
            if (this.isMobile) {
                // Для мобилок - fade эффект
                item.classList.toggle('active', i === this.currentIndex);
                item.style.display = i === this.currentIndex ? 'block' : 'none';
                item.style.opacity = i === this.currentIndex ? '1' : '0';
                item.style.transition = 'opacity 0.5s ease';
            } else {
                // Для десктопа - каскадный эффект
                item.classList.remove('active', 'prev', 'next', 'hidden');

                if (i === this.currentIndex) {
                    item.classList.add('active');
                } else if (i === (this.currentIndex - 1 + this.items.length) % this.items.length) {
                    item.classList.add('prev');
                } else if (i === (this.currentIndex + 1) % this.items.length) {
                    item.classList.add('next');
                } else {
                    item.classList.add('hidden');
                }
            }
        });

        // Обновляем картинки (одинаково для всех разрешений)
        this.images.forEach((img, i) => {
            img.style.transition = 'all 0.5s ease';
            img.classList.remove('active', 'prev-1', 'prev-2', 'prev-3');

            const diff = Math.abs(i - this.currentIndex);

            if (i === this.currentIndex) {
                img.classList.add('active');
                img.style.transform = 'translateX(0) scale(1)';
                img.style.opacity = '1';
                img.style.zIndex = '10';
            } else {
                img.style.setProperty('--index', diff);
                img.style.transform = `translateX(calc(30px * ${diff})) translateY(calc(20px * ${diff}))`;
                img.style.opacity = `${0.8 - 0.1 * diff}`;
                img.style.zIndex = `${5 - diff}`;

                if (diff === 1) img.classList.add('prev-1');
                else if (diff === 2) img.classList.add('prev-2');
                else if (diff >= 3) img.classList.add('prev-3');
            }
        });

        // Обновляем dots если есть
        if (this.dotsContainer) {
            const dots = this.dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === this.currentIndex);
            });
        }
    }

    startAutoScroll() {
        this.autoScrollInterval = setInterval(() => {
            this.goToSlide((this.currentIndex + 1) % this.items.length);
        }, this.autoScrollDelay);
    }

    resetAutoScroll() {
        clearInterval(this.autoScrollInterval);
        this.startAutoScroll();
    }

    setupResizeListener() {
        window.addEventListener('resize', () => {
            const newIsMobile = window.innerWidth <= 992;
            if (newIsMobile !== this.isMobile) {
                this.isMobile = newIsMobile;
                if (this.isMobile && !this.dotsContainer.querySelector('.dot')) {
                    this.createDots();
                }
                this.updateSlides();
            }
        });
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    new FeaturesSlider();
});

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    new FeaturesSlider();
});


//readmore in case
document.addEventListener('DOMContentLoaded', function () {
    const TRUNCATE_HEIGHT_DESKTOP = 540;
    const TRUNCATE_HEIGHT_MOBILE = 240;

    function getTruncateHeight() {
        return window.innerWidth <= 768 ? TRUNCATE_HEIGHT_MOBILE : TRUNCATE_HEIGHT_DESKTOP;
    }

    function applyTruncation() {
        document.querySelectorAll('.js-truncate').forEach(desc => {
            const truncateHeight = getTruncateHeight();
            const fullHeight = desc.scrollHeight;
            const container = desc.closest('.n-case__item');

            // Удаляем старую кнопку и классы
            desc.classList.remove('truncated', 'expanded');
            container.classList.remove('expanded');
            const oldBtn = container.querySelector('.read-more-toggle');
            if (oldBtn) oldBtn.remove();

            if (fullHeight > truncateHeight) {
                desc.style.setProperty('--truncate-height', `${truncateHeight}px`);
                desc.classList.add('truncated');

                const btn = document.createElement('div');
                btn.className = 'read-more-toggle';
                btn.innerHTML = '<svg width="24" height="10"><use xlink:href="#faq-arrow"></use></svg>';

                btn.addEventListener('click', () => {
                    const isExpanded = desc.classList.contains('expanded');

                    if (isExpanded) {
                        // Сворачиваем
                        desc.classList.remove('expanded');
                        desc.classList.add('truncated');
                        container.classList.remove('expanded');

                        // Скроллим к началу блока
                        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                        // Раскрываем
                        desc.classList.add('expanded');
                        desc.classList.remove('truncated');
                        container.classList.add('expanded');
                    }
                });

                desc.insertAdjacentElement('afterend', btn);
            }
        });
    }

    applyTruncation();
    window.addEventListener('resize', applyTruncation);
});



//typed cursor
$(() => {
    var typed = new Typed('#typed-text', {
        strings: ["личный ассистент 24/7", "закрою вакансии в срок", "отранжирую базу резюме"],
        typeSpeed: 60,
        backSpeed: 40,
        startDelay: 300,
        backDelay: 1000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
});

// disabled submit
$(document).ready(function () {
    function toggleSubmitButton() {
        // Проверяем, чтобы все чекбоксы были отмечены
        let allChecked = $('.js-form-check').toArray().every(cb => cb.checked);

        $('.js-form-submit').prop('disabled', !allChecked);
    }

    // Проверка при загрузке страницы
    toggleSubmitButton();

    // Проверка при каждом изменении чекбокса
    $('.js-form-check').on('change', toggleSubmitButton);
});

/* show hero img */
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.n-hero__img')?.classList.add('_visible');
    }, 300); // задержка 0.3s
});

// transform to swiper
window.addEventListener('DOMContentLoaded', () => {

    const resizableSwiper = (breakpoint, swiperClass, swiperSettings, callback) => {
        let swiper;

        breakpoint = window.matchMedia(breakpoint);

        const enableSwiper = function(className, settings) {
            swiper = new Swiper(className, settings);

            if (callback) {
                callback(swiper);
            }
        }

        const checker = function() {
            if (breakpoint.matches) {
                return enableSwiper(swiperClass, swiperSettings);
            } else {
                if (swiper !== undefined) swiper.destroy(true, true);
                return;
            }
        };

        breakpoint.addEventListener('change', checker);
        checker();
    }

    // const someFunc = (instance) => {
    //     if (instance) {
    //         instance.on('slideChange', function (e) {
    //             console.log('*** mySwiper.activeIndex', instance.activeIndex);
    //         });
    //     }
    // };

    resizableSwiper(
        '(max-width: 1200px)',
        '.js-review-slider',
        {
            spaceBetween: 80,
            slidesPerView: 2,
            navigation: {
                nextEl: ".js-review-slider-next",
                prevEl: ".js-review-slider-prev"
            },
            breakpoints: {
                0: {
                    slidesPerView: 1
                },
                768: {
                    slidesPerView: 2
                }
            }
        },
    );

    resizableSwiper(
        '(max-width: 1200px)',
        '.js-traifs-slider',
        {
            spaceBetween: 20,
            slidesPerView: 3,
            navigation: {
                nextEl: ".js-tarifs-slider-next",
                prevEl: ".js-tarifs-slider-prev"
            },
            pagination: {
                el: '.js-tarifs-slider-pagination',
                clickable: true
            },
            breakpoints: {
                0: {
                    slidesPerView: 1
                },
                768: {
                    slidesPerView: 2
                },
                992: {
                    slidesPerView: 3
                }
            }
        },
    );


});

$(() => {
    const $faqItems = $('.js-faq-item');

    // Скрываем все, кроме первого
    $faqItems.each(function (index) {
        const $item = $(this);
        const $content = $item.find('.js-faq-item__content');

        if (index === 0) {
            $item.addClass('active');
        } else {
            $content.hide();
        }
    });

    // Обработчик клика
    $('.js-toggle-faq').on('click', function () {
        const $item = $(this).closest('.js-faq-item');
        const $content = $item.find('.js-faq-item__content');

        if ($item.hasClass('active')) {
            $item.removeClass('active');
            $content.stop(true, true).slideUp(200);
        } else {
            $item.addClass('active');
            $content.stop(true, true).slideDown(200);
        }
    });
});
