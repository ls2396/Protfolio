$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 0&& $(this).scrollTop() <= 1160) {
           $(".scroll").css("background", "#E3DFDC").css("transition", "0.4s");
        }
       else if ($(this).scrollTop() >= 1160 && $(this).scrollTop() <= 2080) {
          $(".scroll").css("background", "#F05D22").css("transition", "0.4s");
       }
       else if ($(this).scrollTop() >= 2080 && $(this).scrollTop() <= 3200) {
          $(".scroll").css("background", "#E3DFDC").css("transition", "0.4s");
       }
   });
});


window.addEventListener("scroll", () => {
   const scrollPosition = window.scrollY;
   const reviewImage = document.querySelector(".review_right img");

   const triggerDistance = 1260;
   const maxScale = 1;
   const minScale = 1;

   if (scrollPosition > triggerDistance) {
       let newScale = Math.min((scrollPosition - triggerDistance) / 200 + minScale, maxScale);
       reviewImage.style.transform = `scale(${newScale})`;
       reviewImage.style.transition = "transform 0.6s ease-out"; 
   }
});

document.addEventListener("DOMContentLoaded", () => {
   const reviewImage = document.querySelector(".review_right img");
   reviewImage.style.transform = "scale(0.4)";
});


$(document).ready(function () {
    var title1 = $('.work_wrapper-text-title');
    var title2 = $('.impact_right-title');

    var title1Animated = false;
    var title2Animated = false;

    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > 420) {
            if (!title1Animated) {
                title1.css({
                    transform: 'translateY(0)',
                    transition: 'transform 0.6s ease-out',
                    opacity: 1
                });
                title1Animated = true;
            }
        } else {
            if (!title1Animated) {
                title1.css({
                    transform: 'translateY(100%)',
                    transition: 'transform 0.6s ease-out',
                    opacity: 0
                });
            }
        }
        if (scrollTop > 1920) {
            if (!title2Animated) {
                title2.css({
                    transform: 'translateY(0)',
                    transition: 'transform 0.6s ease-out',
                    opacity: 1
                });
                title2Animated = true;
            }
        } else {
            if (!title2Animated) {
                title2.css({
                    transform: 'translateY(100%)',
                    transition: 'transform 0.6s ease-out',
                    opacity: 0
                });
            }
        }
    });

    $(window).on('load', function () {
        title1Animated = false;
        title2Animated = false;
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

        if (currentScroll > 420 && currentScroll < 1240) {
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
