$(function () {
    function getResponsiveConfig() {
        if (window.matchMedia("(min-width: 1548px)").matches) {
            return { scrollTriggers: [1160, 2280, 2400], scaleTrigger: 1400, title1Trigger: 420, title2Trigger: 2080 };
        } else if (window.matchMedia("(max-width: 1548px) and (min-width: 1188px)").matches) {
            return { scrollTriggers: [900, 1600, 2000], scaleTrigger: 880, title1Trigger: 240, title2Trigger: 1500 };
        } else if (window.matchMedia("(max-width: 1188px) and (min-width: 744px)").matches) {
            return { scrollTriggers: [600, 1000, 1400], scaleTrigger: 600, title1Trigger: 240, title2Trigger: 920 };
        }
        // 默认返回空对象，忽略 max-width: 744px 的配置
        return {};
    }

    function applyResponsiveBehavior() {
        const config = getResponsiveConfig();
        const reviewImage = document.querySelector(".review_right img");

        // 如果配置为空，则直接跳过
        if (!Object.keys(config).length) return;

        $(window).scroll(function () {
            const scrollTop = $(this).scrollTop();

            // 背景颜色变化
            if (scrollTop >= 0 && scrollTop <= config.scrollTriggers[0]) {
                $(".scroll").css("background", "#E3DFDC").css("transition", "0.4s");
            } else if (scrollTop > config.scrollTriggers[0] && scrollTop <= config.scrollTriggers[1]) {
                $(".scroll").css("background", "#F05D22").css("transition", "0.4s");
            } else if (scrollTop > config.scrollTriggers[1] && scrollTop <= config.scrollTriggers[2]) {
                $(".scroll").css("background", "#E3DFDC").css("transition", "0.4s");
            }

            // 图片缩放逻辑
            const maxScale = 1;
            const minScale = 0.4; // 初始缩放比例
            if (scrollTop >= config.scaleTrigger) {
                const newScale = Math.min((scrollTop - config.scaleTrigger) / 200 + minScale, maxScale);
                reviewImage.style.transform = `scale(${newScale})`;
                reviewImage.style.transition = "transform 0.4s ease-out";
            } else {
                reviewImage.style.transform = `scale(${minScale})`; // 保持初始比例
                reviewImage.style.transition = "transform 0.4s ease-out";
            }
        });

        // 初始标题动画状态
        const title1 = $('.work_wrapper-text-title');
        const title2 = $('.impact_right-title');
        let title1Animated = false;
        let title2Animated = false;

        $(window).scroll(function () {
            const scrollTop = $(this).scrollTop();
            if (scrollTop > config.title1Trigger && !title1Animated) {
                title1.css({ transform: 'translateY(0)', transition: 'transform 0.4s ease-out', opacity: 1 });
                title1Animated = true;
            } else if (scrollTop <= config.title1Trigger) {
                title1.css({ transform: 'translateY(100%)', opacity: 0 });
                title1Animated = false;
            }

            if (scrollTop > config.title2Trigger && !title2Animated) {
                title2.css({ transform: 'translateY(0)', transition: 'transform 0.4s ease-out', opacity: 1 });
                title2Animated = true;
            } else if (scrollTop <= config.title2Trigger) {
                title2.css({ transform: 'translateY(100%)', opacity: 0 });
                title2Animated = false;
            }
        });
    }

    applyResponsiveBehavior();

    $(window).on('resize', () => {
        $(window).off('scroll');
        applyResponsiveBehavior();
    });

    document.addEventListener("DOMContentLoaded", () => {
        const reviewImage = document.querySelector(".review_right img");
        reviewImage.style.transform = "scale(0.4)";
        reviewImage.style.transition = "transform 0.4s ease-out";
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const careerSection = document.querySelector('.career');
    const careerText = document.querySelectorAll('.career *');
    const careerRightBorder = document.querySelector('.career_content-right');
    const careerBottomBorders = document.querySelectorAll('.right_group1, .right_group2');
    let lastScroll = 0;

    const handleScroll = () => {
        const currentScroll = window.scrollY;
        const careerTop = careerSection.offsetTop;
        const careerBottom = careerTop + careerSection.offsetHeight;

        const screenWidth = window.innerWidth;

        let minScroll = 240;
        let maxScroll;

        // 根据屏幕宽度设置滚动范围
        if (screenWidth >= 1548) {
            maxScroll = 1080;
        } else if (screenWidth < 1548 && screenWidth >= 1188) {
            maxScroll = 1080;
        } else if (screenWidth < 1188 && screenWidth >= 744) {
            maxScroll = 1080;
        } else if (screenWidth < 744) {
            maxScroll = 560; // 在小屏幕下改变滚动范围
        }

        if (currentScroll > minScroll && currentScroll < maxScroll) {
            applyActiveStyles();
        } else {
            resetStyles();
        }

        lastScroll = currentScroll;
    };

    const applyActiveStyles = () => {
        careerSection.style.backgroundColor = 'var(--bgColor)';
        careerRightBorder.style.borderColor = 'var(--transTextColor)';
        careerBottomBorders.forEach(el => el.style.borderColor = 'var(--transTextColor)');
        careerText.forEach(el => el.style.color = 'var(--transTextColor)');
    };

    const resetStyles = () => {
        careerSection.style.backgroundColor = 'var(--subColor)';
        careerRightBorder.style.borderColor = 'var(--mainColor)';
        careerBottomBorders.forEach(el => el.style.borderColor = 'var(--mainColor)');
        careerText.forEach(el => el.style.color = 'var(--mainColor)');
    };

    window.addEventListener('scroll', handleScroll);
});
