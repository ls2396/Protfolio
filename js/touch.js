/* switch img */
let currentIndex = 0;
const totalItems = 3;
const content = document.getElementById("content");
const items = document.querySelectorAll(".color");
const itemWidth = items[0].offsetWidth;
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

updateContentPosition();

const slide = (direction) => {
    if (direction === 'prev') {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    } else {
        currentIndex = (currentIndex + 1) % totalItems;
    }
    updateContentPosition();
};

function updateContentPosition() {
    const newPosition = -currentIndex * itemWidth;
    content.style.transition = "left 0.5s ease-in-out";
    content.style.left = newPosition + "px";
}

prev.addEventListener("click", () => slide('prev'));
next.addEventListener("click", () => slide('next'));


/* hover img */
let width = window.innerWidth;
let height = window.innerHeight;
const card = document.getElementById("card");

window.onload = function () {
    let image = cards[Math.floor(Math.random() * cards.length)];
  
    document.getElementById("name").innerHTML = image.name;
    document.getElementById("image").src = image.url;
  
    avgColor(image.url);
}

window.addEventListener("mousemove", e => moved(e.clientX, e.clientY));
window.addEventListener("mouseleave", ended);
window.addEventListener("touchmove", e => moved(e.touches[0].clientX, e.touches[0].clientY));
window.addEventListener("touchend", ended);
window.addEventListener("touchcancel", ended);
window.addEventListener("resize", e => {
    width = window.innerWidth;
    height = window.innerHeight;
});

function moved(x, y) {
    let horizontal = ((x / width) - 0.5) * 60;
    let vertical = ((y / height) - 0.5) * 60; // 去掉负号
    card.style.transform = `rotateY(${horizontal}deg) rotateX(${vertical}deg)`;
}

function ended() {
    card.style.transition = "500ms";
    card.style.transform = "rotateY(0deg) rotateX(0deg)";
    setTimeout(() => card.style.transition = "none", 500);
}

function avgColor(url) {
    const img = new Image();
    img.src = url;
    img.crossOrigin = "anonymous";
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        let r = 0, g = 0, b = 0;
        for (let i = 0; i < data.length; i += 8) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
        }

        const pixelCount = data.length / 4;
        r = Math.floor(r / pixelCount) * 0.5;
        g = Math.floor(g / pixelCount) * 0.5;
        b = Math.floor(b / pixelCount) * 0.5;

        document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    };
}

