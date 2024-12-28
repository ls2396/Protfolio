document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll(".tabbed ul li a");
    const sections = document.querySelectorAll(".tabbed_content section");
    const defaultTab = document.querySelector('a[href="#section1"]');

    function showTabContent(targetId) {
        let visibleSections = [];
        let visibleCount = 0;

        sections.forEach((section) => {
            if (targetId === "#section1" || section.id.includes(targetId.slice(1))) {
                section.style.display = "block";
                section.style.order = visibleCount;
                visibleCount++;
                visibleSections.push(section);

                section.style.borderRight = (visibleCount % 3 === 0) ? "none" : "1px solid var(--mainColor)";
                section.style.paddingBottom = "0";
                section.style.marginBottom = "0";

                const h2 = section.querySelector("h2");
                h2.style.borderTop = (visibleCount > 3) ? "1px solid var(--mainColor)" : "none";
            } else {
                section.style.display = "none";
            }
        });

        const lastRowStart = visibleCount - (visibleCount % 3 || 3);
        for (let i = lastRowStart; i < visibleCount; i++) {
            visibleSections[i].style.paddingBottom = "7vw";
            visibleSections[i].style.marginBottom = "40px";
        }
    }

    showTabContent("#section1");
    defaultTab.style.opacity = 1;

    tabs.forEach(tab => {
        tab.addEventListener("click", function(event) {
            event.preventDefault();

            tabs.forEach(t => {
                t.style.opacity = 0.72;
                t.classList.remove("active");
            });

            this.style.opacity = 1;
            this.classList.add("active");

            // Show relevant content
            const targetId = this.getAttribute("href");
            showTabContent(targetId);
        });
    });
});