document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll(".tabbed ul li a");
    const sections = document.querySelectorAll(".tabbed_content section");
    const defaultTab = document.querySelector('a[href="#section1"]');
    const mediaQuery = window.matchMedia("(max-width: 744px)");

    function showTabContent(targetId) {
        let visibleSections = [];
        let visibleCount = 0;
        const itemsPerRow = mediaQuery.matches ? 2 : 3; // 2 per row if media query matches

        sections.forEach((section, index) => {
            if (targetId === "#section1" || section.id.includes(targetId.slice(1))) {
                section.style.display = "block";
                section.style.order = visibleCount;
                visibleCount++;
                visibleSections.push(section);

                // Apply border-right logic
                section.style.borderRight = (visibleCount % itemsPerRow === 0) ? "none" : "1px solid var(--mainColor)";
                section.style.paddingBottom = "0";
                section.style.marginBottom = "0";

                const h2 = section.querySelector("h2");
                h2.style.borderTop = (visibleCount > itemsPerRow) ? "1px solid var(--mainColor)" : "none";
            } else {
                section.style.display = "none";
            }
        });

        // Adjust styles for the second row under max-width: 744px
        const lastRowStart = visibleCount - (visibleCount % itemsPerRow || itemsPerRow);
        for (let i = lastRowStart; i < visibleCount; i++) {
            visibleSections[i].style.paddingBottom = "7vw";
            visibleSections[i].style.marginBottom = "40px";

            // Move the third item from the first row to the second row
            if (mediaQuery.matches && i === 2) {
                visibleSections[i].style.order = 3; // Move to second row
            }
        }
    }

    // Initialize default tab and content
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

    // Handle media query changes
    mediaQuery.addEventListener("change", () => {
        const activeTab = document.querySelector(".tabbed ul li a.active");
        if (activeTab) {
            const targetId = activeTab.getAttribute("href");
            showTabContent(targetId);
        }
    });
});
